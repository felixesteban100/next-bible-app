"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { ReactNode } from "react";

type NavigatePassageProps = {
    previous_chapter: string,
    next_chapter: string,
    textSize: string,
    iconSize: string,
    gapForElements: string,
    alignmentForFlexElements: string
}


export default function NavigatePassages({ previous_chapter, next_chapter, textSize, iconSize, gapForElements, alignmentForFlexElements }: NavigatePassageProps) {
    const searchParams = useSearchParams()
    const { push } = useTransitionRouter()
    const params = new URLSearchParams(searchParams)
    params.set("verseToHighlight", "0")

    function goNext() {
        params.set("search", next_chapter)
        push(`/read?${params.toString()}`)
    }

    function goPrevious() {
        params.set("search", previous_chapter)
        push(`/read?${params.toString()}`)
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === "ArrowRight" && next_chapter !== "") goNext()
        if (event.key === "ArrowLeft" && previous_chapter !== "") goPrevious()
    })

    return (
        <div className={`flex ${alignmentForFlexElements} justify-start ${gapForElements} fixed bottom-0 h-fit mb-10 `}>
            {previous_chapter !== "" ?
                <Button
                    onClick={() => goPrevious()}
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
                    onClick={() => goNext()}
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