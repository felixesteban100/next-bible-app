import { unstable_setRequestLocale } from 'next-intl/server';

export default function page({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale)

    return (
        <div>{`plan-page`}</div>
    )
}