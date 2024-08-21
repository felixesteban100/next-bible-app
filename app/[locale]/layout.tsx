import { ThemeProvider } from "@/components/theme-provider"
import '.././globals.css';
import { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from "next-intl";
import { ViewTransitions } from "next-view-transitions";

// problems with auth.js when using docker maybe this will help: 
// https://authjs.dev/getting-started/deployment#docker
// https://authjs.dev/reference/core/errors#callbackrouteerror    

// https://www.google.com/search?client=opera-gx&q=Error%3A+TODO%3A+Handle+OIDC+response+body+errorat+ik&sourceid=opera&ie=UTF-8&oe=UTF-8
// https://github.com/nextauthjs/next-auth/issues/10731

// this one to adjust the correct url of the docker container (server)
// https://console.cloud.google.com/apis/credentials/oauthclient/305881758956-1t1cmha3g3iq5hmcjob6ecje705vmekp.apps.googleusercontent.com?project=next-bible-app 


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

/* {true ?
                  <>
                    <div className="bg-secondary/70 backdrop-blur-md p-2 sticky top-0 z-50">
                      <Navbar />
                    </div>
                    <main className="w-[90vw] md:w-[80vw] mx-auto overflow-hidden max-w-[1700px] pt-5 pb-10">
                      {children}
                    </main>
                  </>
                  :
                  <>
                    {children}
                  </>
                } */