import { auth, signIn, signOut } from "@/auth";
import MCGLogo from '@/app/[locale]/ui/wdce-logo';
import LoginForm from '@/app/[locale]/ui/login-form';
import { Button } from '@/app/[locale]/ui/button';

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="mt-4 w-full" type="submit">
        Log in with Google
      </Button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Page() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    // <main className="flex items-center justify-center md:h-screen">
    //   <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
    //     <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
    //       <div className="w-32 text-white md:w-36">
    //         <MCGLogo />
    //       </div>
    //     </div>
    //     <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    //   </div>
      
    // </main>
    <main className="flex items-center justify-center md:h-screen">
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
        <div className="w-32 text-white md:w-36">
          <MCGLogo />
        </div>
      </div>
      <LoginForm />
      <SignIn />
      {/* <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div> */}
    </div>
  </main>
  );
}
/*
import MCGLogo from '@/app/ui/mcg-logo';
import LoginForm from '@/app/ui/login-form';
import LoginGoogle from '@/app/ui/login-google';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <MCGLogo />
          </div>
        </div>
        <LoginForm />
        <LoginGoogle />
      </div>
    </main>
  );
}
*/
