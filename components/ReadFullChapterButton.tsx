"use client"

import { translateRouteString } from "@/lib/queriesUtils";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";

type ReadFullChapterButton = {
    chapter: Chapter;
    version: string
}

export default function ReadFullChapterButton({ chapter, version }: ReadFullChapterButton) {
    const t = useTranslations()

    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const params = new URLSearchParams(searchParams)

    function goToFirstChapter() {
        params.set("search", `${translateRouteString(chapter.route_string, version)}`)
        params.set("version", `${version}`)
        replace(`/read?${params.toString()}`)
    }

    return (
        <Button variant={'link'} className="mt-5 p-1" onClick={() => goToFirstChapter()}>
            {t("Read full chapter")}
        </Button>
    )
}
