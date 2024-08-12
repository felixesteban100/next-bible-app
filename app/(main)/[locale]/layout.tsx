import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from "@/lib/i18nConfig";


export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function layout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string }
}>) {
    unstable_setRequestLocale(locale);
    return (
        <>{children}</>
    )
}