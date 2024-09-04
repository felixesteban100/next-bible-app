
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
import { DAILY_VERSE_ROUTE_STRING, DAILY_VERSES_ROUTE_STRING, fontSize, pageMarginAndWidth } from "@/lib/constants";
import Navbar from "@/components/navbar/Navbar";

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

// in order for tailwind classes to work from afar
// export const fontSize: SelectedFontSize[] = [
//     { text: 'text-xl', firstVerse: "text-3xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
//     { text: 'text-2xl', firstVerse: "text-4xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
//     { text: 'text-3xl', firstVerse: "text-5xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
//     { text: 'text-4xl', firstVerse: "text-6xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-10", aligmentForFlexElements: "flex-row" },
// ]
// export const pageMarginAndWidth = "w-[90vw] lg:w-[83vw] mx-auto overflow-hidden max-w-[1700px] pt-5"
// in order for tailwind classes to work from afar

export default async function page({
    searchParams: { search, version, fontSizeNumber, continousLine, verseToHighlight },
    params: { locale },
}: {
    searchParams: {
        search?: string
        version?: string
        fontSizeNumber?: string;
        continousLine?: string;
        verseToHighlight?: string;
    },
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);

    const language = locale

    const verseToHighlightValue = parseInt(verseToHighlight ?? "0")

    const searchValue = search ?? ""
    const versionValue = version ? version : language === "en" ? "KJV" : language === "es" ? "RV1960" : ""
    const fontSizeValue = fontSizeNumber ?? "1"
    const continousLineValue = continousLine === "true"

    const route_string_to_query_chapter = `${versionValue}-${extractBibleBook(searchValue, versionValue)}-${getChapterNumber(searchValue)}`
    const route_string_to_query_book = `${versionValue}-${extractBibleBook(searchValue, versionValue)}`

    const todays_verse = getDailyItem<DAILY_VERSE_ROUTE_STRING>(DAILY_VERSES_ROUTE_STRING)

    const useVerseOfToday = search === undefined

    const [t, versions, bookInfo, chapter] = await Promise.all([
        getTranslations(),
        collectionVersion.find({}).toArray(),
        collectionBook.findOne({
            'route_object.version_initials': versionValue,
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

    const verses = useVerseOfToday ? todays_verse.verses : extractBibleVerses(searchValue)

    const previous_chapter = translateRouteString(previousChapter?.route_string ?? "", versionValue)
    const next_chapter = translateRouteString(nextChapter?.route_string ?? "", versionValue)

    const selectedFontSize: SelectedFontSize = fontSize[parseInt(fontSizeValue)]

    return (
        <>
            <div
                className={`${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-96 h-0`} transition-all duration-700`}
            >
                <Navbar />
                <div
                    className={`${pageMarginAndWidth}`}
                >
                    <SearchBibleReference
                        versions={JSON.parse(JSON.stringify(versions))}
                        versionParam={versionValue}
                        searchParam={searchValue}
                        selectedFontSize={selectedFontSize}
                    />
                </div>
            </div>

            <main className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements}`}>
                {chapter ?
                    <div className="flex flex-col items-start justify-center mb-32">
                        {useVerseOfToday && <p className={`font-bold ${selectedFontSize.text}`}>{translateRouteString(chapter.route_string, versionValue)}:{todays_verse.verses} ({versionValue})</p>}
                        <div
                            className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
                        >
                            <VersesDisplayer
                                chapter={JSON.parse(JSON.stringify(chapter))}
                                selectedFontSize={selectedFontSize}
                                verses={verses}
                            />
                        </div>
                        {(verses.length > 0 && chapter && versionValue) &&
                            <ReadFullChapterButton
                                chapter={JSON.parse(JSON.stringify(chapter))}
                                version={versionValue}
                                verses={verses}
                                selectedFontSize={selectedFontSize}
                            />
                        }
                    </div>
                    : bookInfo && (getChapterNumber(searchValue) === 0 || getChapterNumber(searchValue) == null) ?
                        <BookInfo
                            bookInfo={JSON.parse(JSON.stringify(bookInfo))}
                            selectedFontSize={selectedFontSize}
                        />
                        :
                        <p>{t("Not_existent_reference")} ({searchValue} ({versionValue}))</p>
                }

                {!useVerseOfToday && <div className={`${verseToHighlightValue === 0 ? "opacity-1" : `opacity-0`} transition-all duration-700 block`}>
                    <NavigatePassages
                        next_chapter={next_chapter}
                        previous_chapter={previous_chapter}
                        textSize={selectedFontSize.text}
                        iconSize={selectedFontSize.icon}
                        gapForElements={selectedFontSize.gap_between_elements}
                        alignmentForFlexElements={selectedFontSize.aligmentForFlexElements}
                    />
                </div>}
            </main>
        </>
    )
}