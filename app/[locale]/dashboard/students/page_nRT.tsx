import { fetchFilteredStudents } from '@/app/lib/data';
import StudentsTable from '@/app/[locale]/ui/students/table';
import StudentsSWR from './studentsSWR';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Students',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const filteredStudents = await fetchFilteredStudents(query);
  //console.log(filteredStudents)

  return (
    <main>
      <StudentsTable students={filteredStudents} />
      <StudentsSWR />
    </main>
  );
}
