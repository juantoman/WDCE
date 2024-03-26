"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/[locale]/ui/button';

export default function ClientExample() {
    const { data: session, update } = useSession()
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const role=searchParams.get('role')?.toString()

     async function updateSession() {
        if (session) {
          const newSession = await update({
            ...session,
            user: { 
                ...session.user,
                role: role
            },
          })
          replace(`${pathname}/${role}`);
        }
      }

    return (
        <div className="flex flex-col gap-4 pt-24 items-center">
            <h1>You have chosen the role <span className="font-bold text-gray-800 uppercase">{role}</span></h1>
            <Button onClick={updateSession}>Save</Button>
        </div>
    )
}