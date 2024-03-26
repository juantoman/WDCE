import { CheckIcon, AcademicCapIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline'
import { UpdateRole } from '@/app/[locale]/ui/norole/buttons'
import { auth } from "@/auth";

export default async function RoleSelector() {
    let session = await auth()
    const id=session?.user?.id

    return (
        <div className="p-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-xl rounded-3xl ring-0 ring-gray-200 flex flex-wrap justify-center lg:max-w-none">
                    <div className="p-2 lg:mt-0 w-full max-w-xs">
                        <div className="bg-white rounded-2xl bg-gray-50 py-4 border-1 shadow-xl text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <AcademicCapIcon className="text-indigo-400 w-36" />
                                </p>
                                <UpdateRole id={id as string} role="teacher" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:mt-0 w-full max-w-xs">
                        <div className="bg-white rounded-2xl bg-gray-50 py-4 border-1 shadow-xl text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <UserIcon className="text-indigo-400 w-36" />
                                </p>
                                <UpdateRole id={id as string} role="student" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:mt-0 w-full max-w-xs">
                        <div className="bg-white rounded-2xl bg-gray-50 py-4 border-1 shadow-xl text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <HomeIcon className="text-indigo-400 w-36" />
                                </p>
                                <UpdateRole id={id as string} role="family" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
