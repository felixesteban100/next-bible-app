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

    return (
        <div className={`flex ${alignmentForFlexElements} justify-start ${gapForElements} fixed bottom-0 h-fit mb-10 `}>
            {previous_chapter !== "" ?
                <Button
                    onClick={() => {
                        params.set("search", previous_chapter)
                        push(`/read?${params.toString()}`)
                    }}
                    type="button"
                    variant={'default'}
                    className={` ${textSize} h-fit flex items-center justify-center`}
                >
                    <ChevronLeft className={iconSize} />
                    <span className="hidden lg:flex">{previous_chapter}</span>
                </Button>
                :
                null
            }

            {next_chapter !== "" ?
                <Button
                    onClick={() => {
                        params.set("search", next_chapter)
                        push(`/read?${params.toString()}`)
                    }}
                    type="button"
                    variant={'default'}
                    className={`${textSize} h-fit flex items-center justify-center`}
                >
                    <span className="hidden lg:flex">{next_chapter}</span>
                    <ChevronRight className={iconSize} />
                </Button>
                :
                null
            }
        </div>
    )
}