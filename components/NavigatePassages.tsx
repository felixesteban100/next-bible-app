"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";


export default function NavigatePassages({ previous_chapter, next_chapter, textSize, iconSize, gapForElements, alignmentForFlexElements }: { previous_chapter: string, next_chapter: string, textSize: string, iconSize: string, gapForElements: string, alignmentForFlexElements: string }) {
    const linkClasses = "text-foreground hover:text-primary p-1"
    const searchParams = useSearchParams()
    const { push } = useTransitionRouter()
    const params = new URLSearchParams(searchParams)
    params.set("verseToHighlight", "0")

    return (
        <div className={`flex ${alignmentForFlexElements} justify-between items-center w-full ${gapForElements}`}>
            {previous_chapter !== "" ?
                <Button onClick={() => {
                    params.set("search", previous_chapter)
                    push(`/read?${params.toString()}`)
                }} type="button" variant={'link'} className={`${linkClasses} ${textSize}`}>
                    <ChevronLeft className={iconSize} />
                    <span className="hidden lg:block">{previous_chapter}</span>
                </Button>
                :
                <div />
            }
            {next_chapter !== "" ?
                <Button onClick={() => {
                    params.set("search", next_chapter)
                    push(`/read?${params.toString()}`)
                }} type="button" variant={'link'} className={`${linkClasses} ${textSize}`}>
                    <span className="hidden lg:block">{next_chapter}</span>
                    <ChevronRight className={iconSize} />
                </Button>
                :
                <div />
            }
        </div>
    )
}