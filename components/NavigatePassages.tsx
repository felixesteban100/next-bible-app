"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "@/lib/navigation"

type NavigatePassageProps = {
    previous_chapter: string,
    next_chapter: string,
    textSize: string,
    iconSize: string,
    gapForElements: string,
    alignmentForFlexElements: string,
    // new added
    verses: number[],
    chapter: Chapter,
}

export default function NavigatePassages({ previous_chapter, next_chapter, textSize, iconSize, gapForElements, alignmentForFlexElements, verses, chapter }: NavigatePassageProps) {
    const searchParams = useSearchParams()
    const { push } = useTransitionRouter()
    const { replace } = useRouter()
    const pathname = usePathname()

    const memoizedParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const verseSelected = parseInt(memoizedParams.get("verseToHighlight") ?? "0")
    const firstVerse = verses[0] ?? 1
    const lastVerse = verses[verses.length - 1] ?? chapter.verses_content.length

    // when the user presses the arrow keys, the verse selected will change and also the chapter
    const handleKeyDown = useCallback((key: string) => {
        switch (key) {
            case "ArrowLeft":
                if (verseSelected === 0) {
                    if (previous_chapter !== "") memoizedParams.set("search", previous_chapter);
                    memoizedParams.set('verseToHighlight', `${0}`);
                    push(`/read?${memoizedParams.toString()}`)
                }
                break;
            case "ArrowRight":
                if (verseSelected === 0) {
                    if (next_chapter !== "") memoizedParams.set("search", next_chapter);
                    memoizedParams.set('verseToHighlight', `${0}`);
                    push(`/read?${memoizedParams.toString()}`)
                }
                break;
            case "ArrowUp":
                if (verseSelected !== 0) {
                    memoizedParams.set('verseToHighlight', `${verseSelected - 1 < firstVerse ? 0 : verseSelected - 1}`)
                } else {
                    memoizedParams.set('verseToHighlight', `${lastVerse}`);
                }
                replace(`${pathname}?${memoizedParams.toString()}`, { scroll: false })
                break;
            case "ArrowDown":
                if (verseSelected !== 0) {
                    memoizedParams.set('verseToHighlight', `${verseSelected + 1 > lastVerse ? 0 : verseSelected + 1}`)
                } else {
                    memoizedParams.set('verseToHighlight', `${firstVerse}`);
                }
                replace(`${pathname}?${memoizedParams.toString()}`, { scroll: false })
                break;
        }
    }, [verseSelected, previous_chapter, next_chapter, push, memoizedParams, replace, pathname, firstVerse, lastVerse]);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => handleKeyDown(event.key);
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [handleKeyDown]);

    return (
        <div className={`flex ${alignmentForFlexElements} justify-start ${gapForElements} fixed bottom-0 h-fit mb-10 `}>
            {previous_chapter !== "" ?
                <Button
                    onClick={() => handleKeyDown("ArrowLeft")}
                    type="button"
                    variant={'default'}
                    className={`${textSize} h-fit flex items-center justify-center`}
                >
                    <ChevronLeft className={iconSize} />
                    <span className="hidden lg:flex">{previous_chapter}</span>
                </Button>
                :
                null
            }

            {next_chapter !== "" ?
                <Button
                    onClick={() => handleKeyDown("ArrowRight")}
                    type="button"
                    variant={'default'}
                    className={`${textSize} h-fit flex items-center justify-center`}
                >
                    <ChevronRight className={iconSize} />
                    <span className="hidden lg:flex">{next_chapter}</span>
                </Button>
                :
                null
            }
        </div>
    )
}