import Image from 'next/image';
import { lusitana } from '@/app/[locale]/ui/fonts';
import Search from '@/app/[locale]/ui/search';
import {
  CustomersTableType,
  FormattedCustomersTable,
  User
} from '@/app/lib/definitions';
import LittleCard from '@/app/[locale]/ui/littlecard';
import { UpdateUser } from '@/app/[locale]/ui/users/buttons';

export default async function UsersTable({
  users,
}: {
  users: User[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Users
      </h1>
      <Search placeholder="Search users..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 dark:bg-gray-700 p-2 md:pt-0">
              <div className="md:hidden">
                {users?.map((user) => (
                  <div
                    key={user.id}
                    className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-full">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={user.image}
                              className="rounded-full"
                              alt={`${user.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{user.name} ({user.role})</p>
                          </div>
                          <div className="flex justify-end">
                            <UpdateUser id={user.id} />
                          </div>
                        </div>
                        <p>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 dark:text-gray-200 md:table">
                <thead className="rounded-md text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900 dark:text-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="group bg-white dark:bg-gray-800">
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.image}
                            className="rounded-full"
                            alt={`${user.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{user.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-sm">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap  px-4 py-5 text-sm">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap  py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateUser id={user.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
