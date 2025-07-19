import SearchBibleReference from "@/components/SearchBibleReference";
import { collectionChapter, collectionVersion } from "@/db/mongodb/mongodb";
import { extractBibleBook, extractBibleVerses, getChapterNumber, getDailyItem, translateRouteString } from "@/lib/queriesUtils";
import { getTranslations, } from "next-intl/server";
import ReadFullChapterButton from "@/components/ReadFullChapterButton";
import VersesDisplayer from "@/components/VersesDisplayer";
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next'
import { DEFAULT_EN_VERSION, DEFAULT_ES_VERSION, fontSize, pageMarginAndWidth } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

type Props = {
    searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata(
    { searchParams }: Props,
): Promise<Metadata> {
    return {
        title: `${searchParams.search ?? ""} ${searchParams.version ?? "Read"}`
    }
}

export default async function PageContent({
    searchParams: { search, version, fontSizeNumber, continousLine, verseToHighlight, dailyVerseType, useShortCuts, playVerses },
    params: { locale },
}: {
    searchParams: {
        search?: string;
        version?: string;
        fontSizeNumber?: string;
        continousLine?: string;
        verseToHighlight?: string;
        dailyVerseType?: string;
        useShortCuts?: string;
        playVerses?: string;
    },
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);

    const language = locale

    const verseToHighlightValue = verseToHighlight ?? ""

    const searchValue = search ?? ""
    const versionValue = version ? version : language === "en" ? DEFAULT_EN_VERSION : language === "es" ? DEFAULT_ES_VERSION : ""
    const fontSizeValue = fontSizeNumber ?? "1"
    const continousLineValue = continousLine === "true"
    const playVersesValue = playVerses === "true"

    const versions = await collectionVersion.find({}).toArray()

    const versionLanguage = versions.find(c => c.initials === versionValue)?.language as "English" | "Spanish"

    const references = searchValue.split(";").map(c => c.trim()).filter(c => c.length > 0)

    const route_string_to_query_chapters = references.map(reference => `${versionValue}-${extractBibleBook(reference, versionLanguage)}-${getChapterNumber(reference)}`).filter(c => c.includes("null") === false)

    const [t, chapters] = await Promise.all([
        getTranslations(),
        collectionChapter.find({
            'route_object.version_initials': versionValue,
            route_string: { $in: route_string_to_query_chapters }
        }).toArray()
    ])

    const verses = references.map(reference => extractBibleVerses(reference))

    const selectedFontSize: SelectedFontSize = fontSize[parseInt(fontSizeValue)]

    const sortedchapters = route_string_to_query_chapters.map(id => chapters.find(item => item.route_string === id)) ?? [];

    return (
        <>
            <div
                className={`${verseToHighlightValue === "" ? "opacity-100" : `opacity-15 cursor-not-allowed`} transition-all duration-700 -z-10`}
            >
                <div
                    className={`${pageMarginAndWidth}`}
                >
                    <SearchBibleReference
                        versions={JSON.parse(JSON.stringify(versions))}
                        versionParam={versionValue}
                        searchParam={searchValue}
                        selectedFontSize={selectedFontSize}
                        omitVerseToHightlight={true}
                        selectedBookNumber={extractBibleBook(searchValue, versionLanguage)!}
                        disabled={verseToHighlightValue !== ""}
                        chapters={true}
                    />
                </div>
            </div>

            <main
                className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements} `}
            >
                {sortedchapters?.map((chapter, i) => {
                    if (!chapter) return null;
                    return (
                        <div key={chapter.route_string} className="flex flex-col items-start justify-center">
                            <p className={`text-2xl font-semibold text-primary ${verseToHighlightValue === "" ? "opacity-100" : `opacity-15 cursor-not-allowed`}`}>{translateRouteString(chapter.route_string, versionLanguage)}</p>
                            <div className="w-full flex justify-between">
                                {(verses.length > 0 && chapter && versionValue) &&
                                    <ReadFullChapterButton
                                        chapter={JSON.parse(JSON.stringify(chapter))}
                                        version={versionValue}
                                        verses={verses[i]}
                                        selectedFontSize={selectedFontSize}
                                        versionLanguage={versionLanguage}
                                    />
                                }
                            </div>
                            <div
                                className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
                            >
                                {
                                    (verses[i].length > 0 && !chapter.verses_content.some((_, verseIndex) => verses[i].includes(verseIndex + 1))) ?
                                        <p>{t("Not_existent_reference")} </p>
                                        :
                                        <VersesDisplayer
                                            chapter={JSON.parse(JSON.stringify(chapter))}
                                            selectedFontSize={selectedFontSize}
                                            verses={verses[i]}
                                            hightlightVerses={true}
                                            wordToHightlight=""
                                            usePlayVerses={playVersesValue}
                                            chapters={true}
                                        />
                                }

                            </div>
                            <Separator className="h-1 my-5" />
                        </div>
                    )
                })
                }
            </main >
        </>
    )

}