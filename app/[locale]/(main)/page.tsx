import { TypewriterEffectSmooth } from "@/components/typewriter-effect";
import { Button } from "@/components/ui/button";
import { Link } from 'next-view-transitions'
import SignedIn from "@/components/auth/SignedIn";
import SignedOut from "@/components/auth/SignedOut";
import { cn } from "@/lib/utils";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// add a history
// add the ability to hightlight
// add the ability to navigate though the passage by making all the other verses blury and the one selected with full opacity by using the arrows up and down

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations();

  const titleArr = t("homePageHeroTitle").split(" ")

  const words: { text: string, className?: undefined | string }[] = titleArr.map((c: string, i: number) => {
    let result: { text: string, className?: undefined | string } = {
      text: c
    }

    if (c.toLowerCase() === "bible." || c.toLowerCase() === "biblia.") result.className = "text-primary"

    return result
  })

  return (
    <main
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col items-center justify-center h-[40rem] ">
        <p className="text-foreground text-base mb-10">
          {t("homePageHeroDescription")}
        </p>
        <TypewriterEffectSmooth words={words} className="hidden lg:flex" />
        <p className="block lg:hidden">{words.map(c => (<span key={c.text} className={cn(c.className, "text-5xl font-semibold")}>{c.text} </span>))}</p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <SignedIn>
            <Button>
              <Link href={`/read`}>{t("readNow")}</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button>
              <Link href={`/sign-in`}>{t("signIn")}</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
