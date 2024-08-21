import { collectionChapter } from "@/db/mongodb/mongodb"
import { translateRouteString } from "@/lib/queriesUtils";
import { getTranslations } from "next-intl/server"
import ReadFullChapterButton from "./ReadFullChapterButton";
import { DAILY_VERSE_ROUTE_STRING, DAILY_VERSES_ROUTE_STRING } from "@/lib/constants";
import VersesDisplayer from "./VersesDisplayer";

export default async function VerseOfTheDay({ version, selectedFontSize }: { version: string, selectedFontSize: { text: string, firstVerse: string } }) {
    const todays_verse = getDailyItem<DAILY_VERSE_ROUTE_STRING>(DAILY_VERSES_ROUTE_STRING)

    const [t, chapter] = await Promise.all([
        getTranslations(),
        collectionChapter.findOne({ 'route_string': `${version}-${todays_verse.route_string}` })
    ])

    if (!chapter) return <div>{t("chapter_error")}</div>


    function getDailyItem<T>(array: T[]): T {
        const today = new Date().toDateString(); // Get the current date as a string
        const hash = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0); // Simple hash based on date string
        const index = hash % array.length; // Ensure index is within array bounds
        return array[index];
    };

    return (
        <div className="space-y-6">
            <p className={`font-bold ${selectedFontSize.text}`}>{t("VerseOfTheDay")}</p>
            <div className={`${selectedFontSize.text}`}>
                <p className="font-bold">{translateRouteString(chapter.route_string, version)}:{todays_verse.verses} ({version})</p>
                <VersesDisplayer
                    chapter={chapter}
                    selectedFontSize={selectedFontSize}
                    verses={todays_verse.verses}
                    error_message={t("chapter_error")}
                />
            </div>
            <ReadFullChapterButton chapter={chapter} version={version} selectedFontSize={selectedFontSize} />
        </div>
    )
}
