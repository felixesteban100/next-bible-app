import ReadFullChapterButton from '@/components/ReadFullChapterButton';
import SearchBibleReference from '@/components/SearchBibleReference';
import VersesDisplayer from '@/components/VersesDisplayer';

import { collectionChapter, collectionVersion } from '@/db/mongodb/mongodb';
import { bibleBooks } from '@/lib/bibleBooks';
import { DEFAULT_EN_VERSION, DEFAULT_ES_VERSION, fontSize, pageMarginAndWidth } from '@/lib/constants';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
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

    const versionValue = version ? version : locale === "en" ? DEFAULT_EN_VERSION : locale === "es" ? DEFAULT_ES_VERSION : ""
    const continousLineValue = continousLine === "true"
    const searchValue = (search ?? "").trim()

    const t = await getTranslations()

    const selectedFontSize = fontSize[parseInt(fontSizeNumber ?? "0")]

    const regexForSearch = new RegExp(`\\b${searchValue}(?=[\\s.,!?;:]|[a-zA-Z]|$)`, "i")

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

    const versionLanguage = versions.find(c => c.initials === versionValue)?.language as "English" | "Spanish"

    return (
        <div>
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
                {(searchValue !== "") ?
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
                                        <h2 className={`font-bold ${selectedFontSize.text}`}>{bibleBooks[versionLanguage][chapter.route_object.book_id]} {chapter.route_object.chapter_id}</h2>
                                        <div
                                            className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
                                        >
                                            <VersesDisplayer
                                                chapter={chapter}
                                                selectedFontSize={selectedFontSize}
                                                verses={chapter.matchingIndices.map(c => c + 1)}
                                                hightlightVerses={false}
                                                wordToHightlight={search}
                                            />
                                        </div>
                                        <ReadFullChapterButton
                                            chapter={JSON.parse(JSON.stringify(chapter))}
                                            version={versionValue}
                                            verses={chapter.matchingIndices.map(c => c + 1)}
                                            selectedFontSize={selectedFontSize}
                                            versionLanguage={versionLanguage}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <div>
                        <p className='text-3xl'>{t("type_to_search")}</p>
                    </div>
                }
            </main>
        </div >
    )
}
