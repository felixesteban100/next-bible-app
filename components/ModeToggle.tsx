"use client"

import * as React from "react"
import { Check, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const t = useTranslations()
    const checkClasses = "text-primary"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className="capitalize">
                    {t("light")} {theme === "light" && <Check className={checkClasses} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="capitalize">
                    {t("dark")} {theme === "dark" && <Check className={checkClasses} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="capitalize">
                    {t("system")} {theme === "system" && <Check className={checkClasses} />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}