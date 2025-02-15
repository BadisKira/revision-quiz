import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import '@/app/globals.css'
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Focus",
  description: "Optimize your Youtube watch time",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <>
      <html suppressHydrationWarning>
        <head />
        <body >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
