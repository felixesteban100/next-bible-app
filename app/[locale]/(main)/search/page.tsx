import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { collectionChapter } from '@/db/mongodb/mongodb';
import { bibleBooks } from '@/lib/bibleBooks';
import { Search } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function page({ params: { locale }, searchParams: { search, version } }: { params: { locale: string }, searchParams: { search: string, version: string } }) {
    unstable_setRequestLocale(locale)

    const versionValue = version ?? "KJV"


    const queryOptions: { $match?: { verses_content: { $regex: string, $options: string } } } = {}

    if (search) queryOptions.$match = {
        "verses_content": {
            $regex: `${search}`,
            $options: "im"
        }
    }




    const chapters = await collectionChapter.aggregate<Chapter>([
        /* queryOptions, */
        {
            $match: {
                "verses_content": {
                    $regex: `${search}`,
                    $options: "im"
                },
                "route_object.version_initials": versionValue ?? 'KJV'
            }
        },
        {
            $project: {
                _id: 1,
                route_string: 1,
                route_object: 1,
                verses_content: {
                    $filter: {
                        input: "$verses_content",
                        as: "verse",
                        cond: {
                            $regexMatch: {
                                input: "$$verse",
                                regex: `${search}`,
                                options: "im"
                            }
                        }
                    }
                }
            }
        }
    ]).toArray()

    return (
        <div>
            <Navbar />

            <div className='flex gap-5 mx-auto max-w-[900px] my-10'>
                <Input defaultValue={search} />
                <Button><Search /></Button>
            </div>

            {chapters &&
                < div className='space-y-8'>
                    <div>
                        {chapters.map(chapter => {
                            return (
                                <div key={chapter.route_string}>
                                    <h2 className='font-bold'>{bibleBooks[versionValue as 'KJV' | 'RV1960'][chapter.route_object.book_id]} {chapter.route_object.chapter_id}</h2>
                                    <div>
                                        {chapter.verses_content.map(verse => {
                                            return (
                                                /* https://www.reddit.com/r/reactjs/comments/zjerzm/how_to_go_about_highlighting_text_after_render/ */
                                                <div key={verse}>
                                                    <p>{'[we must pust the verse index here]'} {verse}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <p>Results: {chapters.length}</p>
                </div>
            }
        </div >
    )
}