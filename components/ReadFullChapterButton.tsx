"use client"

import { translateRouteString } from "@/lib/queriesUtils";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/navigation";
// import { useTransitionRouter } from "next-view-transitions";

type ReadFullChapterButton = {
    chapter: Chapter;
    version: string;
    selectedFontSize: SelectedFontSize;
    verses?: number[]
}

export default function ReadFullChapterButton({ chapter, version, selectedFontSize, verses }: ReadFullChapterButton) {
    const t = useTranslations()

    const searchParams = useSearchParams()
    // const { /* replace, */ push } = useTransitionRouter()
    const { /* replace, */ push } = useRouter()
    const params = new URLSearchParams(searchParams)

    function goToFirstChapter() {
        params.set("search", `${translateRouteString(chapter.route_string, version)}`)
        params.set("version", `${version}`)
        if (verses) params.set("verseToHighlight", `${verses[0]}`)
        // replace(`/read?${params.toString()}`)
        push(`/read?${params.toString()}`)
    }

    return (
        /* mt-5  p-1*/
        <Button variant={'link'} className={`p-0  ${selectedFontSize.text}`} onClick={() => goToFirstChapter()}>
            {t("Read full chapter")}
        </Button>
    )
}
