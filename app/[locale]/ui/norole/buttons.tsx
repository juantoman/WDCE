import Link from 'next/link';
import { updateRole } from '@/app/lib/actions';

export function UpdateRole({ id, role }: { id: string, role: string}) {
  const updateRoleWithId = updateRole.bind(null, id);

  return (
    <form action={updateRoleWithId}>
      <button name="role" value={role} className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span>{role}</span>
      </button>
    </form>
  );
}
