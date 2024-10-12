import Navbar from '@/components/navbar/Navbar';
import ReadFullChapterButton from '@/components/ReadFullChapterButton';
import SearchBibleReference from '@/components/SearchBibleReference';
import SearchWordsInBibleInput from '@/components/SearchWordsInBibleInput';
import VersesDisplayer from '@/components/VersesDisplayer';

import { collectionBook, collectionChapter, collectionVersion } from '@/db/mongodb/mongodb';
import { bibleBooks } from '@/lib/bibleBooks';
import { fontSize, pageMarginAndWidth } from '@/lib/constants';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next'


type Props = {
    searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata(
    { searchParams }: Props,
): Promise<Metadata> {
    return {
        title: `${searchParams.search ?? ""} ${searchParams.version ?? "Search"}`
    }
}

export default async function page({ params: { locale }, searchParams: { search, version, fontSizeNumber, continousLine } }: { params: { locale: string }, searchParams: { search: string, version: string, fontSizeNumber: string, continousLine: string } }) {
    unstable_setRequestLocale(locale)

    const versionValue = version ?? "KJV"
    const continousLineValue = continousLine === "true"
    const searchValue = search ?? ""

    const selectedFontSize = fontSize[parseInt(fontSizeNumber ?? "0")]

    const regexForSearch = new RegExp(`\\b${search}(?=[\\s.,!?;:]|[a-zA-Z]|$)`, "i")

    const [chapters, versions] = await Promise.all([
        collectionChapter.aggregate<Chapter>([
            {
                $match: {
                    verses_content: {
                        $elemMatch: { $regex: regexForSearch } // Match full words with word boundaries
                    },
                    "route_object.version_initials": versionValue
                }
            },
            {
                $project: {
                    _id: 1,
                    route_string: 1,
                    route_object: 1,
                    verses_content: 1,
                    verses_routes_string: 1,
                    matchingIndices: {
                        $reduce: {
                            input: { $range: [0, { $size: "$verses_content" }] }, // Generate an array of indices
                            initialValue: [],
                            in: {
                                $cond: [
                                    {
                                        $regexFind: {
                                            input: { $arrayElemAt: ["$verses_content", "$$this"] }, // Access each verse by index
                                            regex: regexForSearch // Ensure word boundary
                                        }
                                    },
                                    { $concatArrays: ["$$value", ["$$this"]] }, // Append the index if match found
                                    "$$value" // Keep the current accumulated value if no match
                                ]
                            }
                        }
                    }
                }
            },
        ]).sort({ "route_object": 1 }).toArray(),
        collectionVersion.find({}).toArray(),
    ])

    return (
        <div>
            {/* <SearchWordsInBibleInput selectedFontSize={selectedFontSize} search={search} /> */}

            <div
                className={`${pageMarginAndWidth}`}
            >
                <SearchBibleReference
                    versions={JSON.parse(JSON.stringify(versions))}
                    versionParam={versionValue}
                    searchParam={searchValue}
                    selectedFontSize={selectedFontSize}
                    selectedBookNumber={0}
                />
            </div>

            <main className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements}`}>
                {(search) ?
                    <div className='space-y-8'>
                        <div className='flex flex-col gap-2'>
                            <p className={`${selectedFontSize.text}`}>Results (chapters): {chapters.length}</p>
                            <p
                                className={`${selectedFontSize.text}`}
                            >
                                Results (verses): {chapters.reduce((acc, c) => {
                                    if (c.matchingIndices) acc.push(...c.matchingIndices)
                                    return acc
                                }, new Array()).length}
                            </p>
                        </div>

                        <div className={`flex flex-col ${selectedFontSize.gap_between_elements}`}>
                            {chapters.map(chapter => {
                                if (!chapter.matchingIndices || chapter.matchingIndices.length < 0) return

                                return (
                                    <div key={chapter.route_string} >
                                        <h2 className={`font-bold ${selectedFontSize.text}`}>{bibleBooks[versionValue as 'KJV' | 'RV1960'][chapter.route_object.book_id]} {chapter.route_object.chapter_id}</h2>
                                        <div
                                            className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
                                        >
                                            <VersesDisplayer chapter={chapter} selectedFontSize={selectedFontSize} verses={chapter.matchingIndices} hightlightVerses={false} wordToHightlight={search} />
                                        </div>
                                        <ReadFullChapterButton
                                            chapter={JSON.parse(JSON.stringify(chapter))}
                                            version={versionValue}
                                            verses={chapter.matchingIndices.map(c => c + 1)}
                                            selectedFontSize={selectedFontSize}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    :
                    null
                }
            </main>
        </div >
    )
}