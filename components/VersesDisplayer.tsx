"use client"

import { useKeyPress } from '@/hooks/useKeyPress'
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/lib/navigation"
// import { useTransitionRouter } from 'next-view-transitions'

type VersesDisplayerProps = {
    chapter: Chapter,
    selectedFontSize: SelectedFontSize,
    verses: number[],
    hightlightVerses: boolean;
    wordToHightlight: string
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses, hightlightVerses, wordToHightlight }: VersesDisplayerProps) {
    const searchParams = useSearchParams()
    const { replace } = useRouter()/* useTransitionRouter() */
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    const firstVerse = verses[0] ?? 1
    const lastVerse = verses[verses.length - 1] ?? chapter.verses_content.length

    const verseSelected = parseInt(params.get("verseToHighlight") ?? "0")

    function setVerseToHighlight(verse: number) {
        params.set('verseToHighlight', `${verse}`)
        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    /* const [verseSelected, setVerseToHighlight] = useState(0)

    useEffect(() => {
        setVerseToHighlight(0)
    }, [chapter]) */

    useEffect(() => {
        const currentVerse = document.getElementById(`${verseSelected}`)
        if (currentVerse && verseSelected !== 0) {
            currentVerse.scrollIntoView({
                behavior: 'smooth',
                inline: "center",
                block: "center"
            })
        }

    }, [verseSelected])


    /* this is struggling to load fast sometimes */
    useKeyPress(() => {
        if (verseSelected === 0) setVerseToHighlight(firstVerse)
        const newVerseToSelect = verseSelected - 1
        if (newVerseToSelect < firstVerse) {
            setVerseToHighlight(lastVerse)
        } else {
            setVerseToHighlight(newVerseToSelect)
        }
    }, ["ArrowUp"]);

    useKeyPress(() => {
        if (verseSelected === 0) setVerseToHighlight(lastVerse)
        const newVerseToSelect = verseSelected + 1
        if (newVerseToSelect > lastVerse) {
            setVerseToHighlight(firstVerse)
        } else {
            setVerseToHighlight(newVerseToSelect)
        }
    }, ["ArrowDown"]);
    /* this is struggling to load fast sometimes */

    function getHighlightedText(text: string, highlight: string) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => {
                    return (
                        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? "font-bold bg-primary text-primary-foreground" : ""}>
                            {part}
                        </span>
                    )
                })}
            </span>
        );
    }

    return (
        <>
            {
                chapter.verses_content.map((c, i) => {
                    const verseNumber = i + 1
                    const isSelected = verseSelected === verseNumber
                    if (verses.length !== 0 && !verses.includes(verseNumber)) return null
                    const verseRouteString = chapter.verses_routes_string[verseNumber]
                    // console.log(verseRouteString)
                    return (
                        <span
                            id={`${verseNumber}`}
                            onClick={() => {
                                if (!hightlightVerses) return

                                if (isSelected) {
                                    setVerseToHighlight(0)
                                } else {
                                    setVerseToHighlight(verseNumber)
                                }
                            }}
                            // data-verse={verseRouteString}
                            // style={{ viewTransitionName: `${verseRouteString}` }}
                            // style={{ viewTransitionName: `ok` }}
                            key={verseRouteString}
                            // "underline"
                            // "bg-primary text-primary-foreground"
                            className={`${selectedFontSize.text} leading-relaxed ${verseSelected !== 0 ? (isSelected ? "text-foreground" : "text-foreground/15") : ""} ${hightlightVerses ? "hover:underline decoration-dashed" : ""} `}
                        >
                            <span
                                className={`${hightlightVerses && verseNumber === 1 && `${selectedFontSize.firstVerse} font-bold`}`}
                            >
                                {!hightlightVerses ? verseNumber
                                    : chapter.route_object.book_id === 19 && verseNumber === 1 ? chapter.verses_content[0][0]
                                        : verseNumber === 1 ? chapter.route_object.chapter_id
                                            : verseNumber
                                }
                            </span>
                            {" "}
                            {!hightlightVerses ?
                                getHighlightedText(c, wordToHightlight) :
                                chapter.route_object.book_id === 19 && verseNumber === 1 ? `${c.slice(1)}` : c
                            }
                        </span>
                    )
                })
            }
        </>

    )

}