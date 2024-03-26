'use client';

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/[locale]/ui/button';
import { updateUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { User } from '@/app/lib/definitions';
import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function EditUserForm({
  user,
}: {
  user: User;
}) {
  //const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  //const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const roles= [
    {
      id:1,
      name:'user'
    },
    {
      id:2,
      name:'admin'
    },
    {
      id:3,
      name:'teacher'
    },
    {
      id:4,
      name:'student'
    },
  ]

  return (
    <form action={updateUserWithId}>
      <div className="mt-4 border rounded-xl bg-white">
        <div className="mt-4 px-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User details</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100 px-4">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-3 text-gray-900">Username</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="relative">
                  <select
                    id={user.id}
                    name="role"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={user.role}
                    aria-describedby="role-error"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
