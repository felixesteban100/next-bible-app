
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

// ['text-xl', "text-3xl", 'text-2xl', "text-4xl", "text-5xl", "text-6xl", "text-8xl"]

export default async function page({
    searchParams: { search, version, fontSizeNumber, continousLine },
    params: { locale },
}: {
    searchParams: {
        search?: string
        version?: string
        fontSizeNumber?: string;
        continousLine?: string;
    },
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);

    const language = locale

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

    const fontSize = [
        { text: 'text-xl', firstVerse: "text-3xl" },
        { text: 'text-2xl', firstVerse: "text-4xl" },
        { text: 'text-3xl', firstVerse: "text-5xl" },
        { text: 'text-4xl', firstVerse: "text-6xl" },
        { text: 'text-6xl', firstVerse: "text-8xl" },
    ]

    const selectedFontSize = fontSize[parseInt(fontSizeValue)]

    return (
        <div className="p-2 space-y-6">
            <SearchBibleReference
                versions={versions}
                previous_chapter={previous_chapter}
                next_chapter={next_chapter}
                versionParam={versionValue}
                searchParam={searchValue}
                fontSizeParam={fontSizeValue}
                continousLineParam={continousLineValue}
            />

            <div className={continousLineValue ? "space-x-4" : "flex flex-col gap-2"}>
                {chapter ?
                    <VersesDisplayer
                        chapter={chapter}
                        selectedFontSize={selectedFontSize}
                        verses={verses}
                    />
                    : bookInfo && getChapterNumber(searchValue) === 0 ?
                        (<BookInfo bookInfo={bookInfo} selectedFontSize={selectedFontSize} />)
                        : search && version ?
                            <p>{t("Not_existent_reference")} ({search} ({version}))</p>
                            :
                            <VerseOfTheDay_staticData version={versionValue} selectedFontSize={selectedFontSize} />
                }
            </div>

            {(verses.length > 0 && chapter && version) &&
                <ReadFullChapterButton chapter={chapter} version={version} selectedFontSize={selectedFontSize} />
            }


            <NavigatePassages
                next_chapter={next_chapter}
                previous_chapter={previous_chapter}
            />
        </div>
    )
}