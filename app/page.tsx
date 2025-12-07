'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Image from 'next/image';
import PaslonLists from '@/data/paslon.json';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/login');
    }

    const checkUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?username=${username}`);

        const data = await res.json();

        if (!res.ok) {
          console.log('User check error:', data.message);
          return;
        }

        if (data.user.choice !== 0) {
          router.replace('/voted');
        }
      } catch (error) {
        console.log('Check user error:', error);
      }
    };

    checkUser();
  }, [router]);

  const handleVote = async (value: number) => {
    try {
      const username = localStorage.getItem('username');

      if (!username) {
        router.push('/login');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          choice: value
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('Vote error:', data);
        return;
      }

      router.push('/voted');
    } catch (error) {
      console.log('Vote failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col items-center pt-20 sm:px-16 px-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">Pilih dengan bijak</h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            Saatnya tentukan pilihanmu untuk <span className="font-medium text-zinc-950">SMANSA Singaraja</span> yang
            lebih baik.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5">
          {PaslonLists.map((e, i) => {
            return (
              <Card className="w-full max-w-sm" key={i}>
                <CardHeader className="">
                  <Image
                    className="w-full h-60 rounded-lg object-cover"
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="grow">Vote</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Apakah kamu Yakin?</DialogTitle>
                        <DialogDescription>
                          Kamu akan memilih paslon{' '}
                          <b className="text-black">
                            {e.paslonNumber} | {e.paslonName}
                          </b>
                          . Pilihan kamu bersifat permanen dan tidak akan bisa diganti.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => handleVote(e.value)}>Lanjutkan</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="grow">
                        Lihat Visi
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">{e.vision}</PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <Button variant={'link'} onClick={handleLogout}>
          Log out
        </Button>
      </main>
    </div>
  );
}
