"use client"

import { useRouter } from "next/navigation"
import { useKeyPress } from '@/hooks/useKeyPress'
import useHash from '@/hooks/useHash'

type VersesDisplayerProps = {
    chapter: Chapter,
    selectedFontSize: {
        firstVerse: string,
        text: string
    },
    verses: number[],
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses }: VersesDisplayerProps) {
    const { push } = useRouter()

    const hash = useHash()
    const verseSelected = parseInt(hash ? hash.split("#")[1] : "0")

    const firstVerse = verses[0] ?? 1
    const lastVerse = verses[verses.length - 1] ?? chapter.verses_content.length


    useKeyPress(() => {
        if (verseSelected === 0) push(`#${firstVerse}`)
        const newVerseToSelect = verseSelected - 1
        if (newVerseToSelect < firstVerse) {
            push(`#${lastVerse}`)
        } else {
            push(`#${newVerseToSelect}`)
        }
    }, ["ArrowUp"]);

    useKeyPress(() => {
        if (verseSelected === 0) push(`#${lastVerse}`)
        const newVerseToSelect = verseSelected + 1
        if (newVerseToSelect > lastVerse) {
            push(`#${firstVerse}`)
        } else {
            push(`#${newVerseToSelect}`)
        }
    }, ["ArrowDown"]);

    return (
        <>
            {
                chapter.verses_content.map((c, i) => {
                    const verseNumber = i + 1
                    const isSelected = verseSelected === verseNumber
                    const verseJSX = (
                        <span
                            id={`${verseNumber}`}
                            onClick={() => {
                                if (isSelected) {
                                    push(`#0`)
                                } else {
                                    push(`#${verseNumber}`)
                                }
                            }}
                            key={chapter.verses_routes_string[i]}
                            className={`${selectedFontSize.text} leading-relaxed ${isSelected ? "underline" : ""} hover:underline decoration-dashed`}
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

                    if (verses.length === 0) return (verseJSX)
                    if (!verses.includes(i + 1)) return null
                    return (verseJSX)
                })
            }
        </>
    )

}


VersesDisplayer