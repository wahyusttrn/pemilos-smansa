import Image from 'next/image';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col justify-center items-center py-32 px-16">
        <Image className="" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Pemilihan Ketua OSIS SMANSA Singaraja
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            !!!!Looking for a starting point or more instructions? Head over to{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950"
            >
              Templates
            </a>{' '}
            or the{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950"
            >
              Learning
            </a>{' '}
            center.
          </p>
        </div>
        <div className="w-full max-w-md">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-black" htmlFor="username">
                  Username
                </FieldLabel>
                <Input id="username" type="text" placeholder="" />
              </Field>
              <Field>
                <FieldLabel className="text-black" htmlFor="password">
                  Password
                </FieldLabel>
                <Input id="password" type="password" placeholder="" />
              </Field>
              <Field orientation="horizontal">
                <Button className="bg-black" type="submit">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </main>
    </div>
  );
}
