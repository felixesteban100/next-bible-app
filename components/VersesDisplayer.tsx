"use client"

import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/lib/navigation"
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { TextGenerateEffect } from "./text-generate-effect";


type VersesDisplayerProps = {
    chapter: Chapter,
    selectedFontSize: SelectedFontSize,
    verses: number[],
    hightlightVerses: boolean;
    wordToHightlight: string;
    usePlayVerses: boolean;
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses, hightlightVerses, wordToHightlight, usePlayVerses }: VersesDisplayerProps) {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const { /* replace, */ push } = useRouter()
    const pathname = usePathname()
    const verseSelected = parseInt(params.get("verseToHighlight") ?? "0")
    const t = useTranslations()

    const verseRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (verseSelected !== 0 && verseRef.current) {
            verseRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [verseSelected])

    function setVerseToHighlight(verse: number) {
        params.set('verseToHighlight', `${verse}`)
        // replace(`${pathname}?${params.toString()}`, { scroll: false })
        push(`${pathname}?${params.toString()}`, { scroll: false })
    }

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

    if (verses.length > 0 && !chapter.verses_content.some((_, verseIndex) => verses.includes(verseIndex + 1))) return <p>{t("Not_existent_reference")} </p>

    if (usePlayVerses && hightlightVerses) {
        return <TextGenerateEffect chapter={chapter} verses={verses} filter={false} words={chapter.verses_content.map((c, i) => `${i + 1} ${c}`).join("")} selectedFontSize={selectedFontSize} chapterIndex={chapter.route_object.chapter_id} />
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
                            key={verseRouteString}
                            // "underline"
                            // "bg-primary text-primary-foreground"
                            className={`${selectedFontSize.text} leading-relaxed ${verseSelected !== 0 ? (isSelected ? "text-foreground" : "text-foreground/15") : ""} ${hightlightVerses ? "hover:underline decoration-dashed" : ""} `}
                            ref={verseNumber === verseSelected ? verseRef : null}
                        >

                            <span
                                className={`${hightlightVerses && verseNumber === 1 && `${selectedFontSize.firstVerse}`} text-primary font-bold`}
                            >
                                {!hightlightVerses ? verseNumber + " "
                                    : chapter.route_object.book_id === 19 && verseNumber === 1 ? chapter.verses_content[0][0]
                                        : verseNumber === 1 ? `${chapter.route_object.chapter_id} `
                                            : verseNumber + " "
                                }
                            </span>
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