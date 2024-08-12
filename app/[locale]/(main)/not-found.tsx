import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server"

export default function NotFoundPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale)

    const t = useTranslations();
    return <h1>{t('NotFoundPage.title')}</h1>;
}