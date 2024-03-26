import UserData from "@/app/[locale]/ui/userdata";
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import RoleSelector from "./selectRole";

export default function Page({}) {
  return (
    <main className="pt-24">
      <h1 className="mb-4 text-xl md:text-2xl">
        <UserData />
      </h1>
      <div className=" h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-700 md:block">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-700 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div>Sign Out</div>
          </button>
        </form>
      </div>
      <RoleSelector />
    </main>
  );
}
