import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import PaslonLists from '@/data/paslon.json';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col items-center pt-20 px-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">Pilih dengan bijak</h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            Saatnya tentukan pilihanmu untuk <span className="font-medium text-zinc-950">SMANSA Singaraja</span> yang
            lebih baik.
          </p>
        </div>
        <div className="w-full flex gap-5">
          {PaslonLists.map((e, i) => {
            return (
              <Card className="w-full max-w-sm" key={i}>
                <CardHeader className="rounded-2xl">
                  <Image
                    className="w-full rounded-lg"
                    src={e.image}
                    alt={`Foto Paslon ${e.paslonName}`}
                    width={500}
                    height={500}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>
                    {e.paslonNumber} | {e.paslonName}
                  </CardTitle>
                  <CardDescription>{e.fullNames}</CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="grow">Vote</Button>
                  <Button variant="outline" className="grow">
                    Lihat Visi
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <Button variant={'link'}>Log out</Button>
      </main>
    </div>
  );
}
