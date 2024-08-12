import { Button } from "../ui/button";
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
import { BookOpen } from "lucide-react";
import SignedIn from "../auth/SignedIn";
import SignedOut from "../auth/SignedOut";
import UserInfo from "../auth/UserInfo";
import ButtonForNavbarLink from "./ButtonForNavbarLink";

export default function Navbar() {
    const t = useTranslations()

    return (
        <nav className="flex items-center justify-between w-[90vw] md:w-[80vw] max-w-[1700px] min-h-[4rem] mx-auto gap-5">
            <div className="hidden md:flex gap-5 items-center">
                <ButtonForNavbarLink
                    href="/"
                    variant={'ghost'}
                    size={'icon'}
                    aditionalClassNames="flex items-center"
                >
                    <BookOpen size={40} />
                </ButtonForNavbarLink>

                <ButtonForNavbarLink
                    href={'/read'}
                    variant={'ghost'}
                >
                    {t("read")}
                </ButtonForNavbarLink>

                <ButtonForNavbarLink
                    href={'/plan'}
                    variant={'ghost'}
                >
                    {t("plan")}
                </ButtonForNavbarLink>

                <ButtonForNavbarLink
                    href={'/study_tools'}
                    variant={'ghost'}
                >
                    {t("study_tools")}
                </ButtonForNavbarLink>
            </div>
            <div className="flex md:hidden gap-5">
                <Sheet>
                    <SheetTrigger>
                        <BookOpen size={40} />
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetHeader>
                            <SheetTitle>{t("navbar_sheet_title")}</SheetTitle>
                            <SheetDescription>
                                {t("navbar_sheet_description")}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col my-10 mx-auto gap-5">
                            <SheetClose asChild>
                                <ButtonForNavbarLink
                                    href={'/'}
                                    variant={'ghost'}
                                    aditionalClassNames="w-full text-2xl"
                                >
                                    {t("navbar_home")}
                                </ButtonForNavbarLink>
                            </SheetClose>

                            <SheetClose asChild>
                                <ButtonForNavbarLink
                                    href={'/read'}
                                    variant={'ghost'}
                                    aditionalClassNames="w-full text-2xl"
                                >
                                    {t("read")}
                                </ButtonForNavbarLink>
                            </SheetClose>

                            <SheetClose asChild>
                                <ButtonForNavbarLink
                                    href={'/plan'}
                                    variant={'ghost'}
                                    aditionalClassNames="w-full text-2xl"
                                >
                                    {t("plan")}
                                </ButtonForNavbarLink>
                            </SheetClose>


                            <SheetClose asChild>
                                <ButtonForNavbarLink
                                    href={'/study_tools'}
                                    variant={'ghost'}
                                    aditionalClassNames="w-full text-2xl"
                                >
                                    {t("study_tools")}
                                </ButtonForNavbarLink>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex gap-5">
                <SignedOut>
                    <ButtonForNavbarLink
                        href={'/study_tools'}
                        variant={"default"}
                        aditionalClassNames="w-full text-sm text-primary-foreground font-semibold"
                    >
                        {t("signIn")}
                    </ButtonForNavbarLink>
                </SignedOut>
                <SignedIn>
                    <UserInfo />
                </SignedIn>
                <ModeToggle />
                <LanguageToggle />
            </div>
        </nav>
    )
}