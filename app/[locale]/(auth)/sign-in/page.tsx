import SignedIn from "@/components/auth/SignedIn"
import SignedOut from "@/components/auth/SignedOut"
import { SignIn } from "@/components/auth/sign-in"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Link } from "next-view-transitions"

export default async function page({ params: { locale } }: { params: { locale: string } }) {
    // unstable_setRequestLocale(locale);

    const t = await getTranslations()

    return (
        <Card className="backdrop-blur-lg bg-background/20 px-16">
            <CardHeader>
                <BookOpen className="mx-auto" size={40} />
                <CardTitle className="mx-auto">{t("signIn")}</CardTitle>
                <SignedIn>
                    <CardDescription className="mx-auto">{t("signedInDescription")}</CardDescription>
                </SignedIn>
                <SignedOut>
                    <CardDescription className="mx-auto">{t("signedOutDescription")}</CardDescription>
                </SignedOut>
            </CardHeader>
            {/* md:flex-row */}
            <CardContent className="flex flex-col  justify-center items-center gap-5">
                <SignIn />
                <Link href={"/"}>
                    <Button variant={'link'} className="text-foreground">
                        {t("returnToMainPage")}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}