'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('Login error:', data.message);
        return;
      }

      //! replace with sonner later
      console.log('Login success:', data);

      localStorage.setItem('username', data.username);

      router.replace('/');
    } catch (error) {
      //! replace with sonner later
      console.log('Login request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex gap-5 min-h-screen w-full max-w-3xl flex-col items-center pt-20 px-16">
        <div className="w-[200px]">
          <Image
            className="w-full"
            src="/smansa_transparent.webp"
            alt="Smansa Singaraja"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Pemilihan Ketua OSIS SMANSA Singaraja
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            Silakan masuk menggunakan akun yang <span className="font-medium text-zinc-950">telah terdaftar</span> untuk
            mengikuti proses pemilihan Ketua OSIS Tahun 2026
          </p>
        </div>

        <Card className="w-full max-w-sm">
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <CardFooter className="flex-col gap-2 mt-6 px-0">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
