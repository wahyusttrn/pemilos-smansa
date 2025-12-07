import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Login() {
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
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input id="username" type="username" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
