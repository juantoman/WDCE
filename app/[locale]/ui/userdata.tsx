"use client"

import { useSession } from "next-auth/react"

export default function UserData() {
  const { data: session } = useSession()

  return (
    <section>
      <h1>Welcome {`${session?.user?.email} (${session?.user?.role}) (${session?.user?.id})`}</h1>
      <div> </div>
    </section>
  );
}