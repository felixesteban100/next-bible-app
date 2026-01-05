"use client"

import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/lib/navigation"
import { useEffect, useRef } from "react";
import { Separator } from "./ui/separator";


type VersesDisplayerProps = {
    chapter: Chapter,
    selectedFontSize: SelectedFontSize,
    verses: number[],
    hightlightVerses: boolean;
    wordToHightlight: string;
    usePlayVerses: boolean;
    chapters?: boolean;
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses, hightlightVerses, wordToHightlight, usePlayVerses, chapters = false }: VersesDisplayerProps) {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const { push } = useRouter()
    const pathname = usePathname()
    const versesSelected: number[] = JSON.parse(params.get("versesToHighlight") ?? "[]")

    const verseRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (versesSelected.length > 0 && verseRef.current) {
            verseRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [versesSelected])

    function addToVersesToHighlight(verse: number) {
        //include verse in the array of verses to highlight
        versesSelected.push(verse)

        params.set('versesToHighlight', JSON.stringify(versesSelected))
        push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    function removeFromVerseToHighlight(verse: number) {
        const index = versesSelected.indexOf(verse);
        if (index > -1) {
            versesSelected.splice(index, 1); // Remove the verse from the array
        }
        params.set('versesToHighlight', JSON.stringify(versesSelected))
        push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    function getHighlightedText(text: string, highlight: string) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => {
                    return (
                        <span key={part + i} className={part.toLowerCase() === highlight.toLowerCase() ? "font-bold bg-primary text-primary-foreground" : ""}>
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
                    // const currentVerse = `${chapter.route_string}-${verseNumber}`
                    const isSelected = versesSelected.includes(verseNumber)
                    if (verses.length !== 0 && !verses.includes(verseNumber)) return null
                    const verseRouteString = chapter.verses_routes_string[verseNumber - 1]
                    return (
                        <span
                            key={verseRouteString + verseNumber + c}
                            onClick={() => {
                                if (!hightlightVerses) return
                                if (isSelected) {
                                    removeFromVerseToHighlight(verseNumber)
                                } else {
                                    addToVersesToHighlight(verseNumber)
                                }
                            }}
                            className={`${selectedFontSize.text} leading-relaxed ${versesSelected.length > 0 ? (isSelected ? "" : "opacity-15") : ""} text-foreground   `}
                            ref={verseNumber === versesSelected[0] ? verseRef : null}
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
                            {
                                // Show separator if the next verse number is not sequential
                                (() => {
                                    const currentIndex = verses.findIndex(v => v === verseNumber);
                                    if (
                                        currentIndex !== -1 &&
                                        currentIndex < verses.length - 1 &&
                                        verses[currentIndex + 1] !== verseNumber + 1
                                    ) {
                                        return <Separator className="h-0.5 my-2" />;
                                    }
                                    return null;
                                })()
                            }
                        </span>
                    )
                })
            }
        </>

    )

}