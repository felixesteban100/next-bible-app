"use client"

import { translateRouteString } from "@/lib/queriesUtils";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";

type BookInfoProps = {
    bookInfo: Book;
    selectedFontSize: { text: string, firstVerse: string }
}

export default function BookInfo({ bookInfo, selectedFontSize }: BookInfoProps) {
    const t = useTranslations()

    const searchParams = useSearchParams()
    const { push } = useRouter()
    const params = new URLSearchParams(searchParams)

    function goToChapter(search: string) {
        params.set("search", search)
        push(`/read?${params.toString()}`)
    }

    return (
        <div className={`${selectedFontSize.text}`}>
            <p><span className="font-bold">{t("initials")}: </span>{bookInfo.initials}</p>
            <p><span className="font-bold">{t("name")}: </span>{bookInfo.name}</p>
            <p><span className="font-bold">{t("date_written")}: </span>{bookInfo.date_written}</p>
            <p><span className="font-bold">{t("type_of_written")}: </span>{bookInfo.type_of_written}</p>
            <p><span className="font-bold">{t("written_by")}: </span>{bookInfo.written_by}</p>
            <p><span className="font-bold">{t("description")}: </span>{bookInfo.description}</p>

            <div className="mt-5 space-y-5">
                <p className="font-bold">{t("chapters")}</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {bookInfo.chapters_routes_string.map(c => {
                        return (
                            <Button variant={'outline'} key={c} onClick={() => goToChapter(`${translateRouteString(c, params.get("version") ?? "KJV")}`)}>
                                {translateRouteString(c, params.get("version") ?? "KJV")}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}