'use client'

import useSWR from "swr"

async function fetcher(...args: Parameters<typeof fetch>) {
    return (await fetch(...args)).json();
  }

export default function StudentsSWR () {
  const { data, error, isLoading } = useSWR("/dashboard/students/api", fetcher, { refreshInterval: 1000 })
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  // renderizar datos
  return (
    <div>
      {data?.map((student:any) => (
        <div key={student.id}>
          <p>{student.name}</p>
          <p>{student.xp}</p>
        </div>
      ))}
    </div>
  )
}