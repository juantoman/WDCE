'use client'

import useSWR from "swr"
import { lusitana } from '@/app/[locale]/ui/fonts';
import { UpdateXP } from '@/app/[locale]/ui/students/buttons';


async function fetcher(...args: Parameters<typeof fetch>) {
    return (await fetch(...args)).json();
  }

export default function StudentsSWR () {
  const { data, error, isLoading } = useSWR("/dashboard/students/api", fetcher, { refreshInterval: 1000 })
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  // renderizar datos
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Students
      </h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {data?.map((student:any) => (
                  <div
                    key={student.id}
                    className="mb-2 w-full rounded-md bg-white dark:bg-gray-700 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{student.name}</p>
                            <p>{student.xp}</p>
                            <UpdateXP id={student.id}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      XP
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {data.map((student:any) => (
                    <tr key={student.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{student.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <p>{student.xp}</p>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <UpdateXP id={student.id} />
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
    
  )
}
