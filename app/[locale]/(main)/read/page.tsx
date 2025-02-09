// import SearchBibleReference from "@/components/SearchBibleReference";
// import { collectionBook, collectionChapter, collectionVersion } from "@/db/mongodb/mongodb";
// import { extractBibleBook, extractBibleVerses, getChapterNumber, getDailyItem, translateRouteString } from "@/lib/queriesUtils";
// import { getTranslations, } from "next-intl/server";
// import NavigatePassages from "@/components/NavigatePassages";
// import BookInfo from "@/components/BookInfo";
// import ReadFullChapterButton from "@/components/ReadFullChapterButton";
// import VersesDisplayer from "@/components/VersesDisplayer";
// import { unstable_setRequestLocale } from 'next-intl/server';
// import type { Metadata } from 'next'
// import { DAILY_VERSE_ROUTE_STRING, DAILY_VERSES_AGAINS_SIN_ROUTE_STRING, DAILY_VERSES_ROUTE_STRING, DEFAULT_EN_VERSION, DEFAULT_ES_VERSION, fontSize, pageMarginAndWidth } from "@/lib/constants";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/lib/navigation";

// type Props = {
//     searchParams: { [key: string]: string | undefined }
// }

// export async function generateMetadata(
//     { searchParams }: Props,
// ): Promise<Metadata> {
//     return {
//         title: `${searchParams.search ?? ""} ${searchParams.version ?? "Read"}`
//     }
// }

// export default async function page({
//     searchParams: { search, version, fontSizeNumber, continousLine, verseToHighlight, dailyVerseType, useShortCuts },
//     params: { locale },
// }: {
//     searchParams: {
//         search?: string
//         version?: string
//         fontSizeNumber?: string;
//         continousLine?: string;
//         verseToHighlight?: string;
//         dailyVerseType?: string;
//         useShortCuts?: string;
//     },
//     params: { locale: string }
// }) {
//     unstable_setRequestLocale(locale);

//     const language = locale

//     const verseToHighlightValue = parseInt(verseToHighlight ?? "0")

//     const dailyVerseTypeValue = dailyVerseType ?? ""
//     const searchValue = search ?? ""
//     const versionValue = version ? version : language === "en" ? DEFAULT_EN_VERSION : language === "es" ? DEFAULT_ES_VERSION : ""
//     const fontSizeValue = fontSizeNumber ?? "1"
//     const continousLineValue = continousLine === "true"

//     const route_string_to_query_chapter = `${versionValue}-${extractBibleBook(searchValue, versionValue)}-${getChapterNumber(searchValue)}`
//     const route_string_to_query_book = `${versionValue}-${extractBibleBook(searchValue, versionValue)}`

//     const todays_verse = getDailyItem<DAILY_VERSE_ROUTE_STRING>(dailyVerseTypeValue === "sin" ? DAILY_VERSES_AGAINS_SIN_ROUTE_STRING : DAILY_VERSES_ROUTE_STRING)

//     const useVerseOfToday = searchValue === "" || searchValue === "verse of the day"
//     const useBookInfo = /^(?:[1-3]\s)?[a-zA-Z\s]+$/.test(searchValue);

//     const [t, versions, bookInfo, chapter] = await Promise.all([
//         getTranslations(),
//         collectionVersion.find({}).toArray(),
//         collectionBook.findOne({
//             'route_object.version_initials': versionValue,
//             route_string: route_string_to_query_book
//         }),
//         useVerseOfToday ? collectionChapter.findOne({ 'route_string': `${versionValue}-${todays_verse.route_string}` }) : collectionChapter.findOne({
//             'route_object.version_initials': versionValue,
//             route_string: route_string_to_query_chapter
//         })
//     ])

//     const [[previousChapter], [nextChapter]] = await Promise.all([
//         collectionChapter.find({ 'route_object.version_initials': versionValue, route_object: { $lt: chapter?.route_object } }).sort({ route_object: -1 }).limit(1).toArray(),
//         collectionChapter.find({ 'route_object.version_initials': versionValue, route_object: { $gt: chapter?.route_object } }).sort({ route_object: 1 }).limit(1).toArray()
//     ])

//     const verses = useVerseOfToday ? todays_verse.verses.map(c => c) : extractBibleVerses(searchValue).map(c => c)

//     const previous_chapter = translateRouteString(previousChapter?.route_string ?? "", versionValue)
//     const next_chapter = translateRouteString(nextChapter?.route_string ?? "", versionValue)

//     const selectedFontSize: SelectedFontSize = fontSize[parseInt(fontSizeValue)]

//     return (
//         <>
//             <div
//                 className={`${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-96 h-0`} transition-all duration-700`}
//             >
//                 <div
//                     className={`${pageMarginAndWidth}`}
//                 >
//                     <SearchBibleReference
//                         versions={JSON.parse(JSON.stringify(versions))}
//                         versionParam={versionValue}
//                         searchParam={searchValue}
//                         selectedFontSize={selectedFontSize}
//                         omitVerseToHightlight={true}
//                         selectedBookNumber={extractBibleBook(searchValue, versionValue)!}
//                     />
//                 </div>
//             </div>

//             <main className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col ${selectedFontSize.gap_between_elements}`}>
//                 {chapter ?
//                     <div className="flex flex-col items-start justify-center mb-32">
//                         {useVerseOfToday && <p className={`font-bold ${selectedFontSize.text}`}>{translateRouteString(chapter.route_string, versionValue)}:{todays_verse.verses.length === 1 ? todays_verse.verses.at(0) : `${todays_verse.verses.at(0)}-${todays_verse.verses.at(-1)}`} ({versionValue}) - ({t("VerseOfTheDay")})</p>}
//                         <div
//                             className={`${continousLineValue ? "space-x-4" : "flex flex-col gap-2"} `}
//                         >
//                             <VersesDisplayer
//                                 chapter={JSON.parse(JSON.stringify(chapter))}
//                                 selectedFontSize={selectedFontSize}
//                                 verses={verses}
//                                 hightlightVerses={!useVerseOfToday}
//                                 wordToHightlight=""
//                             />
//                         </div>
//                         <div className="w-full flex justify-between">
//                             {(verses.length > 0 && chapter && versionValue) &&
//                                 <ReadFullChapterButton
//                                     chapter={JSON.parse(JSON.stringify(chapter))}
//                                     version={versionValue}
//                                     verses={verses}
//                                     selectedFontSize={selectedFontSize}
//                                 />
//                             }
//                             {useVerseOfToday && <Link href={`/read?dailyVerseType=${dailyVerseTypeValue === "sin" ? "" : "sin"}`}>
//                                 <Button variant={'link'} className={selectedFontSize.text}>{t(dailyVerseTypeValue === "sin" ? "Get verse of general topics" : "Get verse against sin")}</Button></Link>}
//                         </div>
//                     </div>
//                     : bookInfo && (getChapterNumber(searchValue) === 0 || getChapterNumber(searchValue) == null) ?
//                         <BookInfo
//                             bookInfo={JSON.parse(JSON.stringify(bookInfo))}
//                             selectedFontSize={selectedFontSize}
//                         />
//                         :
//                         <p>{t("Not_existent_reference")} ({searchValue} ({versionValue}))</p>
//                 }

//                 {(useBookInfo || useVerseOfToday || chapter == null) ?
//                     null
//                     :
//                     <div className={`${verseToHighlightValue === 0 ? "opacity-1" : `opacity-0`} transition-all duration-700 block`}>
//                         <NavigatePassages
//                             next_chapter={next_chapter}
//                             previous_chapter={previous_chapter}
//                             textSize={selectedFontSize.text}
//                             iconSize={selectedFontSize.icon}
//                             gapForElements={selectedFontSize.gap_between_elements}
//                             alignmentForFlexElements={selectedFontSize.aligmentForFlexElements}
//                             // new added
//                             verses={verses}
//                             chapter={JSON.parse(JSON.stringify(chapter))}
//                             useShortCuts={useShortCuts === "true"}
//                         />
//                     </div>
//                 }
//             </main>
//         </>
//     )
// }

import { pageMarginAndWidth } from '@/lib/constants'
import { Loader } from 'lucide-react'
import { Suspense } from "react";
import PageContent from "./_components/PageContent"
import type { Metadata } from 'next'

export async function generateMetadata(
    { searchParams }: any,
): Promise<Metadata> {
    return {
        title: `${searchParams.search ?? ""} ${searchParams.version ?? "Read"}`
    }
}

export default function Page({ searchParams, params }: any) {
    const { dailyVerseType, search, version } = searchParams

    return (
        <Suspense key={`${JSON.stringify({ dailyVerseType, search, version })}`} fallback={<Loading />}>
            <PageContent searchParams={searchParams} params={params} />
        </Suspense>
    );
}

// https://github.com/vercel/next.js/issues/49297
//https://www.reddit.com/r/nextjs/comments/17jyiuj/how_do_you_show_the_loading_state_with_the_app/
//https://www.reddit.com/r/nextjs/comments/1bpwz5t/how_to_show_loading_process_indicator_in_server/
//https://chatgpt.com/c/67a7df02-b8a4-800f-9302-60d40ada268a

function Loading() {
    return (
        <div>
            {/* <NavbarSkeleton /> */}
            <div className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col items-center h-[70vh] w-full`}>
                <Loader size={"100px"} className='animate-spin' />
            </div>
        </div>
    )
}