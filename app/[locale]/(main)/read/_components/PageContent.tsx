import SearchBibleReference from "@/components/SearchBibleReference";
import { collectionBook, collectionChapter, collectionVersion } from "@/db/mongodb/mongodb";
import { extractBibleBook, extractBibleVerses, getChapterNumber, getDailyItem, translateRouteString } from "@/lib/queriesUtils";
import { getTranslations, } from "next-intl/server";
import NavigatePassages from "@/components/NavigatePassages";
import BookInfo from "@/components/BookInfo";
import ReadFullChapterButton from "@/components/ReadFullChapterButton";
import VersesDisplayer from "@/components/VersesDisplayer";
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next'
import { DAILY_VERSE_ROUTE_STRING, DAILY_VERSES_AGAINS_SIN_ROUTE_STRING, DAILY_VERSES_ROUTE_STRING, DEFAULT_EN_VERSION, DEFAULT_ES_VERSION, fontSize, pageMarginAndWidth } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { TextGenerateEffect } from "@/components/text-generate-effect";

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
    // await new Promise(resolve => setTimeout(resolve, 0)); // Simulate loading

    const language = locale

    const verseToHighlightValue = parseInt(verseToHighlight ?? "0")

    const dailyVerseTypeValue = dailyVerseType ?? ""
    const searchValue = search ?? ""
    const versionValue = version ? version : language === "en" ? DEFAULT_EN_VERSION : language === "es" ? DEFAULT_ES_VERSION : ""
    const fontSizeValue = fontSizeNumber ?? "1"
    const continousLineValue = continousLine === "true"
    const playVersesValue = playVerses === "true"

    const versions = await collectionVersion.find({}).toArray()

    const versionLanguage = versions.find(c => c.initials === versionValue)?.language as "English" | "Spanish"

    const route_string_to_query_chapter = `${versionValue}-${extractBibleBook(searchValue, versionLanguage)}-${getChapterNumber(searchValue)}`
    const route_string_to_query_book = `${versionLanguage}-${extractBibleBook(searchValue, versionLanguage)}`

    const todays_verse = getDailyItem<DAILY_VERSE_ROUTE_STRING>(dailyVerseTypeValue === "sin" ? DAILY_VERSES_AGAINS_SIN_ROUTE_STRING : DAILY_VERSES_ROUTE_STRING)

    const useVerseOfToday = searchValue === "" || searchValue === "verse of the day"
    const useBookInfo = /^(?:[1-3]\s)?[a-zA-Z\s]+$/.test(searchValue);

    const [t, bookInfo, chapter] = await Promise.all([
        getTranslations(),
        collectionBook.findOne({
            route_string: route_string_to_query_book
        }),
        useVerseOfToday ? collectionChapter.findOne({ 'route_string': `${versionValue}-${todays_verse.route_string}` }) : collectionChapter.findOne({
            'route_object.version_initials': versionValue,
            route_string: route_string_to_query_chapter
        })
    ])

    const [[previousChapter], [nextChapter]] = await Promise.all([
        collectionChapter.find({ 'route_object.version_initials': versionValue, route_object: { $lt: chapter?.route_object } }).sort({ route_object: -1 }).limit(1).toArray(),
        collectionChapter.find({ 'route_object.version_initials': versionValue, route_object: { $gt: chapter?.route_object } }).sort({ route_object: 1 }).limit(1).toArray()
    ])

    const verses = useVerseOfToday ? todays_verse.verses.map(c => c) : extractBibleVerses(searchValue).map(c => c)

    const previous_chapter = translateRouteString(previousChapter?.route_string ?? "", versionLanguage)
    const next_chapter = translateRouteString(nextChapter?.route_string ?? "", versionLanguage)

    const selectedFontSize: SelectedFontSize = fontSize[parseInt(fontSizeValue)]

    // const versesToCopy = chapter?.verses_content.map((c, i) => `${i + 1} ${c}`).filter((c, i) => verses.includes(i + 1)) ?? []

    return (
        <>
            <div
                // className={`${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-96 `} transition-all duration-700 -z-10`}
                className={`${verseToHighlightValue === 0 ? "opacity-100" : `opacity-15 cursor-not-allowed`} transition-all duration-700 -z-10`}
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
                        disabled={verseToHighlightValue !== 0}
                    />
                </div>
            </div>

            <main
                // className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements} ${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-16`} transition-all duration-700`}
                className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements} `}
            >
                {chapter ?
                    <div className="flex flex-col items-start justify-center mb-32">
                        {useVerseOfToday &&
                            <div className="flex flex-row items-center justify-between mb-4 w-full">
                                <p className={`font-bold ${selectedFontSize.text}`}>{translateRouteString(chapter.route_string, versionLanguage)}:{todays_verse.verses.length === 1 ? todays_verse.verses.at(0) : `${todays_verse.verses.at(0)}-${todays_verse.verses.at(-1)}`} ({versionValue}) - ({t("VerseOfTheDay")})</p>
                            </div>
                        }
                        <div className="w-full flex justify-between">
                            {(verses.length > 0 && chapter && versionValue) &&
                                <ReadFullChapterButton
                                    chapter={JSON.parse(JSON.stringify(chapter))}
                                    version={versionValue}
                                    verses={verses}
                                    selectedFontSize={selectedFontSize}
                                    versionLanguage={versionLanguage}
                                />
                            }
                            {useVerseOfToday && <Link href={`/read?dailyVerseType=${dailyVerseTypeValue === "sin" ? "" : "sin"}`}>
                                <Button variant={'link'} className={selectedFontSize.text}>{t(dailyVerseTypeValue === "sin" ? "Get verse of general topics" : "Get verse against sin")}</Button></Link>}
                        </div>
                        <div
                            className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
                        >
                            {
                                (verses.length > 0 && !chapter.verses_content.some((_, verseIndex) => verses.includes(verseIndex + 1))) ?
                                    <p>{t("Not_existent_reference")} </p>
                                    :
                                    playVersesValue && !useVerseOfToday ?
                                        <TextGenerateEffect
                                            chapter={JSON.parse(JSON.stringify(chapter))}
                                            verses={verses}
                                            words={chapter.verses_content.map((c, i) => `${i + 1} ${c}`).join("")}
                                            selectedFontSize={selectedFontSize}
                                            chapterIndex={chapter.route_object.chapter_id}
                                            next_chapter={next_chapter}
                                        />
                                        :
                                        <VersesDisplayer
                                            chapter={JSON.parse(JSON.stringify(chapter))}
                                            selectedFontSize={selectedFontSize}
                                            verses={verses}
                                            hightlightVerses={!useVerseOfToday}
                                            wordToHightlight=""
                                            usePlayVerses={playVersesValue}
                                        />
                            }

                        </div>

                    </div>
                    : bookInfo && (getChapterNumber(searchValue) === 0 || getChapterNumber(searchValue) == null) ?
                        <BookInfo
                            bookInfo={JSON.parse(JSON.stringify(bookInfo))}
                            selectedFontSize={selectedFontSize}
                            versionLanguage={versionLanguage}
                            version={versionValue}
                        />
                        :
                        <p>{t("Not_existent_reference")} ({searchValue} ({versionValue}))</p>
                }

                {(useBookInfo || useVerseOfToday || chapter == null) ?
                    null
                    :
                    <div className={`${verseToHighlightValue === 0 ? "opacity-1" : `opacity-0`} transition-all duration-700 block`}>
                        <NavigatePassages
                            next_chapter={next_chapter}
                            previous_chapter={previous_chapter}
                            textSize={selectedFontSize.text}
                            iconSize={selectedFontSize.icon}
                            gapForElements={selectedFontSize.gap_between_elements}
                            alignmentForFlexElements={selectedFontSize.aligmentForFlexElements}
                            // new added
                            verses={verses}
                            chapter={JSON.parse(JSON.stringify(chapter))}
                            // versesToCopy={versesToCopy}
                            versesToCopy={chapter.verses_content.map((c, i) => `${i + 1} ${c}`).filter((c, i) => verses.includes(i + 1))}
                            useShortCuts={useShortCuts === "true"}
                        // useShortCuts={(useShortCuts ?? "true") === "false"} // Make something like this work
                        />

                    </div>
                }
            </main>
        </>
    )

}

// export default async function PageContent({ searchParams, params }: any) {

//     return <div>Content Loaded ✅</div>;
// }