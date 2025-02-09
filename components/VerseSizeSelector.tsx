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

    function changeFontSize(value: number) {
        params.set('fontSizeNumber', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changeContinousLine(value: boolean) {
        params.set('continousLine', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changeUseShortCuts(value: boolean) {
        params.set('useShortCuts', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

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