import '@/app/[locale]/ui/global.css';
import { inter } from '@/app/[locale]/ui/fonts';
import { Metadata } from 'next';
import { i18n, type Locale } from "@/i18n-config";
import { ReactNode } from 'react';
import Menu from '@/app/[locale]/ui/menu';
import { ThemeProvider } from "@/app/theme-provider";
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: {
    template: '%s | WDCE Dashboard',
    default: 'WDCE Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const session = await auth()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-slate-50 dark:bg-[#0d1117] duration-1000`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
              <Menu />
              {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
