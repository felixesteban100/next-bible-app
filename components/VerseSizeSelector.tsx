"use client"

import { usePathname, useRouter } from "@/lib/navigation";
import { Check, Text } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function VerseSizeSelector() {
    const t = useTranslations()
    const { push } = useRouter()

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const fontSizeValue = params.get("fontSizeNumber") ?? "0"

    const icon = "h-[2rem] w-[2rem]"

    const continousLineParam = params.get("continousLine") === "true"
    const useShortcuts = params.get("useShortCuts") === "true"
    const playVersesParam = params.get("playVerses") === "true"
    const playVersesDurationParam = parseFloat(params.get("playVersesDuration") ?? "1")
    const verseToHighlight = parseInt(params.get("verseToHighlight") ?? "0")

    function changeFontSize(value: number) {
        params.set('fontSizeNumber', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changeContinousLine(value: boolean) {
        params.set('continousLine', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changePlayVerses(value: boolean) {
        params.set('playVerses', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changePlayVersesDuration(value: number) {
        params.set('playVersesDuration', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changeUseShortCuts(value: boolean) {
        params.set('useShortCuts', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    const versesPlayingSpeed = [
        { value: 1.5, label: "0.5x" },
        { value: 1, label: "1x" },
        { value: 0.7, label: "1.5x" },
        { value: 0.5, label: "1.75x" },
        { value: 0, label: "2x" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-[3.5rem] w-[3.5rem]">
                    <Text className={`${icon}`} />
                    <span className="sr-only">Change text size</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center space-x-2 p-5">
                    <Switch id="continuous_line" checked={continousLineParam} onCheckedChange={(c) => changeContinousLine(c)} />
                    <Label htmlFor="continuous_line">{t("continuous_line")}</Label>
                </div>
                <div className="flex items-center space-x-2 p-5">
                    <Switch disabled={verseToHighlight !== 0} id="play_verses" checked={playVersesParam} onCheckedChange={(c) => changePlayVerses(c)} />
                    <Label htmlFor="play_verses">{t("play_verses")}</Label>
                </div>
                {versesPlayingSpeed.map(c => (
                    <DropdownMenuItem disabled={verseToHighlight !== 0} key={c.value} onClick={() => changePlayVersesDuration(c.value)} className="capitalize text-xl">
                        {c.label} {playVersesDurationParam == c.value && <Check className={`${"text-primary"}`} />}
                    </DropdownMenuItem>
                ))}
                <div className="flex items-center space-x-2 p-5">
                    <Switch id="use_shortcuts" checked={useShortcuts} onCheckedChange={(c) => changeUseShortCuts(c)} />
                    <Label htmlFor="use_shortcuts">{t("use_shortcuts")}</Label>
                </div>
                <DropdownMenuItem onClick={() => changeFontSize(0)} className="capitalize text-xl">
                    {t("xs")} {fontSizeValue === "0" && <Check className={`${"text-primary"}`} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize(1)} className="capitalize text-xl">
                    {t("sm")} {fontSizeValue === "1" && <Check className={`${"text-primary"}`} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize(2)} className="capitalize text-xl">
                    {t("md")}{fontSizeValue === "2" && <Check className={`${"text-primary"}`} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize(3)} className="capitalize text-xl">
                    {t("lg")} {fontSizeValue === "3" && <Check className={`${"text-primary"}`} />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}