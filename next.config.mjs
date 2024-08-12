import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    // domains: ['cdn.jsdelivr.net', 'upload.wikimedia.org'], //make it 'your-domain.com'
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  /* i18n: {
    // // These are all the locales you want to support in
    // // your application
    // locales: ["en-US", "fr", "nl-NL"],
    // // This is the default locale you want to be used when visiting
    // // a non-locale prefixed path e.g. `/hello`
    // defaultLocale: "en-US",
    // // This is a list of locale domains and the default locale they
    // // should handle (these are only required when setting up domain routing)
    // // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".

    locales: ["default", "en", "es"],
    defaultLocale: "default",
    localeDetection: true,
  }, */
};

export default withNextIntl(nextConfig);
