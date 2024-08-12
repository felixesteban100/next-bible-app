import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix /* ... */ } from '@/lib/i18nConfig';

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales, localePrefix/* ... */ });