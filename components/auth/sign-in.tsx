import { signInAction, signOutAction } from "@/auth/actions"
import { Button } from "../ui/button"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import SignedIn from "./SignedIn"
import SignedOut from "./SignedOut"

export async function SignIn({ redirectTo }: { redirectTo?: string }) {
    const t = await getTranslations()
    return (
        <>
            <SignedIn>
                <form action={signOutAction}>
                    <Button type="submit" variant={'outline'} className="gap-2 text-2xl p-8">
                        {t("signOut_ofGoogle")}
                        <Image
                            src={"https://www.svgrepo.com/show/303108/google-icon-logo.svg"}
                            width={500}
                            height={500}
                            alt="google_logo"
                            className="h-5 w-5"
                        />
                    </Button>
                </form>
            </SignedIn>

            <SignedOut>
                <form action={signInAction}>
                    <Button type="submit" variant={'outline'} className="gap-2">
                        {t("signIn_withGoogle")}
                        <Image
                            src={"https://www.svgrepo.com/show/303108/google-icon-logo.svg"}
                            width={500}
                            height={500}
                            alt="google_logo"
                            className="h-5 w-5"
                        />
                    </Button>
                    {redirectTo &&
                        <input type="hidden" value={redirectTo} name="redirectTo" />
                    }
                </form>
            </SignedOut>
        </>
    )
} 