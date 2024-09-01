"use client"

import { useKeyPress } from '@/hooks/useKeyPress'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/lib/navigation"
import { useTransitionRouter } from 'next-view-transitions'

type VersesDisplayerProps = {
    chapter: Chapter,
    selectedFontSize: SelectedFontSize,
    verses: number[],
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses }: VersesDisplayerProps) {
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

    return (
        <>
            {
                chapter.verses_content.map((c, i) => {
                    const verseNumber = i + 1
                    const isSelected = verseSelected === verseNumber
                    if (verses.length !== 0 && !verses.includes(i + 1)) return null
                    const verseRouteString = chapter.verses_routes_string[i]
                    // console.log(verseRouteString)

                    return (
                        <span
                            id={`${verseNumber}`}
                            onClick={() => {
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
                            className={`${selectedFontSize.text} leading-relaxed ${verseSelected !== 0 ? (isSelected ? "text-foreground" : "text-foreground/15") : ""} hover:underline decoration-dashed `}
                        >
                            <span
                                className={`${verseNumber === 1 && `${selectedFontSize.firstVerse} font-bold`}`}
                            >
                                {chapter.route_object.book_id === 19 && verseNumber === 1 ? chapter.verses_content[0][0]
                                    : verseNumber === 1 ? chapter.route_object.chapter_id
                                        : verseNumber
                                }
                            </span>
                            {" "}
                            {chapter.route_object.book_id === 19 && verseNumber === 1 ? `${c.slice(1)}` : c}
                        </span>
                    )
                })
            }

        </>
    )

}