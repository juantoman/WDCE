'use client'

import useSWR from "swr"

async function fetcher(...args: Parameters<typeof fetch>) {
    return (await fetch(...args)).json();
  }

export default function SwrTest () {
  const { data, error, isLoading } = useSWR("/api", fetcher, { refreshInterval: 1000 })
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  // renderizar datos
  return <div>Hello {data.nom}! You have {data.XP} XP!</div>
}