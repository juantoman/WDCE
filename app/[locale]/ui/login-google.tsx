'use client';

import { authGoogle } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';


export default function LoginGoogle() {
  const [errorMessage, dispatch] = useFormState(authGoogle, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in with Google<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
