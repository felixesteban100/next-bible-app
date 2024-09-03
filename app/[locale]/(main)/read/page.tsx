
import SearchBibleReference from "@/components/SearchBibleReference";
import { collectionBook, collectionChapter, collectionVersion } from "@/db/mongodb/mongodb";
import { extractBibleBook, extractBibleVerses, getChapterNumber, translateRouteString } from "@/lib/queriesUtils";
import { getTranslations, } from "next-intl/server";
import NavigatePassages from "@/components/NavigatePassages";
import BookInfo from "@/components/BookInfo";
import ReadFullChapterButton from "@/components/ReadFullChapterButton";
import VerseOfTheDay_staticData from "@/components/VerseOfTheDay";
import VersesDisplayer from "@/components/VersesDisplayer";
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next'
import { fontSize } from "@/lib/constants";
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
"h-[5rem]"
"h-[4rem]"
/* export const fontSize: SelectedFontSize[] = [
    { text: 'text-xl', firstVerse: "text-3xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-2xl', firstVerse: "text-4xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-3xl', firstVerse: "text-5xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-4xl', firstVerse: "text-6xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-10", aligmentForFlexElements: "flex-row" },
] */
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

    const [t, versions] = await Promise.all([
        getTranslations(),
        collectionVersion.find({}).toArray()
    ])

    const searchValue = search ?? ""
    const versionValue = version ? version : language === "en" ? "KJV" : language === "es" ? "RV1960" : ""
    const fontSizeValue = fontSizeNumber ?? "1"
    const continousLineValue = continousLine === "true"

    const route_string_to_query_chapter = `${versionValue}-${extractBibleBook(searchValue, versionValue)}-${getChapterNumber(searchValue)}`
    const route_string_to_query_book = `${versionValue}-${extractBibleBook(searchValue, versionValue)}`

    const [bookInfo, chapter] = await Promise.all([
        collectionBook.findOne({
            'route_object.version_initials': versionValue,
            route_string: route_string_to_query_book
        }),
        collectionChapter.findOne({
            'route_object.version_initials': versionValue,
            route_string: route_string_to_query_chapter
        })
    ])

    const [[previousChapter], [nextChapter]] = await Promise.all([
        collectionChapter.find({ 'route_object.version_initials': version, route_object: { $lt: chapter?.route_object } }).sort({ route_object: -1 }).limit(1).toArray(),
        collectionChapter.find({ 'route_object.version_initials': version, route_object: { $gt: chapter?.route_object } }).sort({ route_object: 1 }).limit(1).toArray()
    ])

    const verses = extractBibleVerses(searchValue)

    const previous_chapter = translateRouteString(previousChapter?.route_string ?? "", versionValue)
    const next_chapter = translateRouteString(nextChapter?.route_string ?? "", versionValue)

    const selectedFontSize: SelectedFontSize = fontSize[parseInt(fontSizeValue)]

    function classForHideElement(animation: string, direction: string) {
        switch (animation) {
            case "fade":
                return `${verseToHighlightValue === 0 ? "opacity-1" : `opacity-0`} transition-all duration-700 block`

            case "translateY":
                return direction === "up" ?
                    `${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-96 h-0`} transition-all duration-700`
                    : direction === "down" ?
                        `${verseToHighlightValue === 0 ? "translate-y-0" : `translate-y-96 h-0`} transition-all duration-700`
                        : ""

            default: return ""
        }
    }

    return (
        <>
            <div
                className={`${classForHideElement("translateY", "up")}`}
            >
                <Navbar />
            </div>

            <main className={`w-[90vw] md:w-[83vw] mx-auto overflow-hidden max-w-[1700px] pt-5 pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements}`}>
                <div className={`${classForHideElement("translateY", "up")}`}>
                    <SearchBibleReference
                        versions={JSON.parse(JSON.stringify(versions))}
                        versionParam={versionValue}
                        searchParam={searchValue}
                        selectedFontSize={selectedFontSize}
                    />
                </div>
                <div className={`flex flex-col ${selectedFontSize.gap_between_elements} `}>
                    <div>
                        {chapter ?
                            <div
                                className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} mb-32`}
                            >
                                <VersesDisplayer
                                    chapter={JSON.parse(JSON.stringify(chapter))}
                                    selectedFontSize={selectedFontSize}
                                    verses={verses}
                                />
                            </div>
                            : bookInfo && getChapterNumber(searchValue) === 0 ?
                                (<BookInfo bookInfo={JSON.parse(JSON.stringify(bookInfo))} selectedFontSize={selectedFontSize} />)
                                : search && version ?
                                    <p>{t("Not_existent_reference")} ({search} ({version}))</p>
                                    :
                                    <VerseOfTheDay_staticData version={versionValue} selectedFontSize={selectedFontSize} />
                        }
                    </div>
                    {(verses.length > 0 && chapter && version) &&
                        <ReadFullChapterButton chapter={JSON.parse(JSON.stringify(chapter))} version={version} selectedFontSize={selectedFontSize} />
                    }
                    <div className={`${classForHideElement("fade", "")}`}>
                        <NavigatePassages
                            next_chapter={next_chapter}
                            previous_chapter={previous_chapter}
                            textSize={selectedFontSize.text}
                            iconSize={selectedFontSize.icon}
                            gapForElements={selectedFontSize.gap_between_elements}
                            alignmentForFlexElements={selectedFontSize.aligmentForFlexElements}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}