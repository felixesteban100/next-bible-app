import { ThemeProvider } from "@/components/theme-provider"
import './globals.css';
import { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from "next-intl";
import { ViewTransitions } from "next-view-transitions";
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    template: '%s | Bible App',
    default: 'Bible App',
  },
  description: 'App for bible reading.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons: {
    icon: 'https://static.vecteezy.com/system/resources/previews/023/221/041/original/open-book-school-supply-icon-free-png.png',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ViewTransitions>
      <html lang={locale}>
        <body>
          <main>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </main>
        </body>
      </html>
    </ViewTransitions>
  )
}