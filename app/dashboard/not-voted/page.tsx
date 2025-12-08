'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  fullname: string;
  status: string;
  createdAt: string;
};

export default function NotVoted() {
  const router = useRouter();
  const [result, setResult] = useState<User[] | null>(null);
  const [totalUser, setTotalUser] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (!username) {
      router.push('/login');
      return;
    }

    // const validateAdmin = async () => {
    //   try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?username=${username}`);
    //     const data = await res.json();

    //     if (data.user.status !== 'ADMIN') {
    //       router.push('/');
    //       return;
    //     }
    //   } catch (error) {
    //     console.log('Dashboard error:', error);
    //   }
    // };

    const getResult = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/not-voted`);
      const data = await res.json();

      setResult(data.users);
      setTotalUser(data.total);
    };

    getResult();
  }, [router]);

  console.log(result);

  return (
    <div className="flex grow items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center pt-20 sm:px-16 px-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">Not Voted</h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">Daftar para user yang belum melakukan voting.</p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full name</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result?.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.username}</TableCell>
                <TableCell>{e.fullname}</TableCell>
                <TableCell>{e.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{totalUser}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </main>
    </div>
  );
}
