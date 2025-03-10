"use client"

import { ModeToggle } from "../ModeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslations } from "next-intl"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet"
import { BookOpen, ListStart, Search } from "lucide-react";
import ButtonForNavbarLink from "./ButtonForNavbarLink";
import { useSearchParams } from "next/navigation";
import VerseSizeSelector from "../VerseSizeSelector";
import { pageMarginAndWidth } from "@/lib/constants";
import { ReactNode, Suspense } from "react";
import NavbarSkeleton from "./NavbarSkeleton";

"h-[3rem] w-auto"

export default function Navbar({ children }: { children?: ReactNode }) {
    const t = useTranslations()

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const verseToHighlightValue = parseInt(params.get("verseToHighlight") ?? "0")

    return (
        <Suspense fallback={<NavbarSkeleton />}>
            <div
            // className={`${verseToHighlightValue === 0 ? "translate-y-0" : `-translate-y-96 `} transition-all duration-700`}
            // className={`${verseToHighlightValue === 0 ? "opacity-100" : `opacity-15 `} transition-all duration-700`}
            >
                <div className="bg-secondary/70 backdrop-blur-md p-2 h-fit">
                    <nav className={`flex items-center justify-between ${pageMarginAndWidth} min-h-[4rem] gap-5 py-5`}>
                        <div className="flex justify-between gap-10 items-center">
                            <Sheet>
                                <SheetTrigger className={`h-[4rem]`}>
                                    <BookOpen className="h-full w-auto" />
                                </SheetTrigger>
                                <SheetContent side={'left'}>
                                    <SheetHeader>
                                        <SheetTitle>{t("navbar_sheet_title")}</SheetTitle>
                                        <SheetDescription>
                                            {t("navbar_sheet_description")}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col my-10 mx-auto gap-5">
                                        <ButtonForNavbarLink
                                            href={'/'}
                                            variant={'ghost'}
                                            aditionalClassNames="w-full"
                                        >
                                            <SheetClose className="w-full text-2xl flex gap-2 justify-center items-center">
                                                <ListStart className="h-full w-auto" />{t("navbar_home")}
                                            </SheetClose>
                                        </ButtonForNavbarLink>

                                        <ButtonForNavbarLink
                                            href={'/read'}
                                            variant={'ghost'}
                                            aditionalClassNames="w-full"
                                        >
                                            <SheetClose className="w-full text-2xl flex gap-2 justify-center items-center">
                                                <BookOpen className="h-full w-auto" />{t("read")}
                                            </SheetClose>
                                        </ButtonForNavbarLink>

                                        <ButtonForNavbarLink
                                            href={'/search'}
                                            variant={'ghost'}
                                            aditionalClassNames="w-full text-2xl flex gap-2"
                                        >
                                            <SheetClose className="w-full text-2xl flex gap-2 justify-center items-center">
                                                <Search className="h-full w-auto" />{t("search")}
                                            </SheetClose>
                                        </ButtonForNavbarLink>
                                        {/* <SheetClose asChild>
                                    <ButtonForNavbarLink
                                        href={'/study_tools'}
                                        variant={'ghost'}
                                        aditionalClassNames="w-full text-2xl flex gap-2"
                                    >
                                        <BookOpen className="h-full w-auto" />{t("study_tools")}
                                    </ButtonForNavbarLink>
                                </SheetClose> */}

                                        {/* <SheetClose asChild>
                                    <ButtonForNavbarLink
                                        href={'/plan'}
                                        variant={'ghost'}
                                        aditionalClassNames="w-full text-2xl flex gap-2"
                                    >
                                        <BookOpen className="h-full w-auto" />{t("plan")}
                                    </ButtonForNavbarLink>
                                </SheetClose> */}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div className="flex gap-5 items-center">
                            {children}
                            <ModeToggle />
                            <LanguageToggle />
                            <VerseSizeSelector />
                        </div>
                    </nav>
                </div>
            </div>
        </Suspense>
    )
}