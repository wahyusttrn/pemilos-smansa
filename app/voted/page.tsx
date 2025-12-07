'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Voted() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (!username) {
      router.push('/login');
      return;
    }

    const checkVoteStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?username=${username}`);

        const data = await res.json();

        if (Number(data.user.choice) === 0) {
          router.push('/');
          return;
        }
      } catch (error) {
        console.log('Validation error:', error);
      }
    };

    checkVoteStatus();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-5 min-h-screen w-full max-w-3xl flex-col items-center pt-20 sm:px-16 px-3">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Terima kasih atas partisipasinya!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            Dengan menggunakan hak suaramu, kamu telah membuktikan bahwa{' '}
            <span className="font-medium text-zinc-950">kamu peduli</span> akan SMA Negeri 1 Singaraja yang lebih baik.
          </p>
        </div>

        <Button variant={'link'} onClick={handleLogout}>
          Log out
        </Button>
      </main>
    </div>
  );
}
