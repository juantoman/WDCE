import CardWrapper from '@/app/[locale]/ui/dashboard/cards';
import RevenueChart from '@/app/[locale]/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/[locale]/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/[locale]/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/[locale]/ui/skeletons';
import UserData from "@/app/[locale]/ui/userdata";
import { getDictionary } from '@/dictionaries/dictionaries'
import { Locale } from '@/i18n-config';

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(locale)
  return (
    <main className="md:pt-10 sm:pt-0">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        <UserData />
      </h1>
      <strong>{dict.welcome}</strong>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
