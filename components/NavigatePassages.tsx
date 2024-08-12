"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams, useRouter } from "next/navigation";


export default function NavigatePassages({ previous_chapter, next_chapter }: { previous_chapter: string, next_chapter: string }) {
    const linkClasses = "text-foreground hover:text-primary p-1"
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const params = new URLSearchParams(searchParams)

    return (
        <div className="flex flex-row justify-between items-center w-full">
            {previous_chapter !== "" ?
                <Button onClick={() => {
                    params.set("search", previous_chapter)
                    push(`/read?${params.toString()}`)
                }} type="button" variant={'link'} className={linkClasses}>
                    <ChevronLeft />
                    {previous_chapter}
                </Button>
                :
                <div />
            }
            {next_chapter !== "" ?
                <Button onClick={() => {
                    params.set("search", next_chapter)
                    push(`/read?${params.toString()}`)
                }} type="button" variant={'link'} className={linkClasses}>
                    {next_chapter}
                    <ChevronRight />
                </Button>
                :
                <div />
            }
        </div>
    )
}