"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Languages } from "lucide-react"
import { usePathname, useRouter } from '@/lib/navigation'
import { useTransition } from "react"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

export function LanguageToggle() {
    const language = useLocale()
    const t = useTranslations()
    const checkClasses = "text-primary"

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const searchParams = useSearchParams()

    function onLanguageClick(value: "en" | "es") {
        startTransition(() => {
            router.replace(
                `${removeLangPrefix(pathname)}?${searchParams}`,
                { locale: value, scroll: false },
            );
        });
        router.refresh()
    }

    function removeLangPrefix(url: string): string {
        return url.replace(/^\/(en|es)/, '');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={isPending} variant="outline" size="icon" className="rounded-full">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onLanguageClick("es")}>
                    {t("spanish")}
                    {language === "es" ? <Check className={checkClasses} /> : null}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageClick("en")}>
                    {t("english")}
                    {language === "en" ? <Check className={checkClasses} /> : null}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}