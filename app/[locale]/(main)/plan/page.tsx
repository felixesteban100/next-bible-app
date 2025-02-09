import { unstable_setRequestLocale } from 'next-intl/server';

export default function page({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale)

    // in order for tailwind classes to work (this was in the read page but i think is not necessary anymore)
    // export const fontSize: SelectedFontSize[] = [
    //     { text: 'text-xl', firstVerse: "text-3xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    //     { text: 'text-2xl', firstVerse: "text-4xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    //     { text: 'text-3xl', firstVerse: "text-5xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    //     { text: 'text-4xl', firstVerse: "text-6xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-10", aligmentForFlexElements: "flex-row" },
    // ]
    // export const pageMarginAndWidth = "w-[90vw] lg:w-[83vw] mx-auto overflow-hidden max-w-[1700px] pt-5"
    // in order for tailwind classes to work 

    return (
        <div>{`plan-page`}


        </div>
    )
}