import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col justify-center items-center py-32 px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">Pilih dengan bijak</h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            !!!! - Looking for a starting point or more instructions? Head over to{' '}
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
        <div className="w-full flex gap-10">
          <Card className="w-full max-w-sm">
            <CardHeader className="rounded-2xl">
              <Image
                className="w-full rounded-lg"
                src="/paslon/baskara.webp"
                alt="Next.js logo"
                width={100}
                height={100}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>01 | Baskara</CardTitle>
              <CardDescription>-- Deskripsi --</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="grow">Vote</Button>
              <Button variant="outline" className="grow">
                Visi
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm">
            <CardHeader className="rounded-2xl">
              <Image
                className="w-full rounded-lg"
                src="/paslon/dwinara.webp"
                alt="Next.js logo"
                width={100}
                height={100}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>02 | Dwinara</CardTitle>
              <CardDescription>-- Deskripsi --</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="grow">Vote</Button>
              <Button variant="outline" className="grow">
                Visi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
