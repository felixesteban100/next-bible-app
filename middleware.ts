import { auth } from "@/auth"
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const publicPages = ['/', '/read', /* '/plan',  */'/sign-in'];

const locales = ['en', 'es']

const intlMiddleware = createMiddleware({
    locales,
    localePrefix: 'always',
    defaultLocale: 'en',
});

const authMiddleware = auth((req) => {
    if (!req.auth && !publicPages.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/sign-in", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
    return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};