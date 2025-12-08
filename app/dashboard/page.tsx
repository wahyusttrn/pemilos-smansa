'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import PaslonLists from '@/data/paslon.json';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Result = {
  paslon1: number;
  paslon2: number;
  notVoted: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (!username) {
      router.push('/login');
      return;
    }

    const validateAdmin = async () => {
      try {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?username=${username}`);
        const userData = await userRes.json();

        if (userData.status !== 'ADMIN') {
          router.push('/');
          return;
        }

        const resultRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/result`);
        const resultData = await resultRes.json();
        setResult(resultData);
      } catch (error) {
        console.log('Dashboard error:', error);
      }
    };

    validateAdmin();
  }, [router]);

  return (
    <div className="flex grow items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center pt-20 sm:px-16 px-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">Welcome, admin.</h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">Berikut merupakan para calon Ketua OSIS</p>
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
              </Card>
            );
          })}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Lihat Hasil</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Hasil Voting</DialogTitle>
              <DialogDescription>Selamat menjabat kepada ketua terpilih!</DialogDescription>
            </DialogHeader>

            <div className="grid gap-2 mt-5">
              {PaslonLists.map((e, i) => (
                <div className="grid grid-cols-3 items-center gap-4" key={i}>
                  <p>
                    {e.paslonNumber} | {e.paslonName}
                  </p>
                  <p className="font-bold">{i === 0 ? result?.paslon1 ?? '---' : result?.paslon2 ?? '---'}</p>
                </div>
              ))}
            </div>

            <p className="mt-8">
              Belum memilih: <strong>{result?.notVoted ?? '---'}</strong>
            </p>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Tutup</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
