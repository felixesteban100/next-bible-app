import { locales } from "@/lib/i18nConfig";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    )
}