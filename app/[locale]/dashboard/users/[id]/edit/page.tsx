import Form from '@/app/[locale]/ui/users/edit-form';
import Breadcrumbs from '@/app/[locale]/ui/users/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchUserById } from '@/app/lib/data';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Edit User',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  {/*const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }*/}

  const user = await fetchUserById(id);

  return (
    <main className='mt-10'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit User',
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Image
              src={user.image}
              className="rounded-full"
              alt={`${user.name}'s profile picture`}
              width={48}
              height={48}
            />
            <p>{user.name} ({user.role})</p>
          </div>
        </div>
        <p className="px-4">
          {user.email}
        </p>
        <Form user={user} />
      </div>

      {/*<Form invoice={invoice} customers={customers} />*/}
    </main>
  );
}
