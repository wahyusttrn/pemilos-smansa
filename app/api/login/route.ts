import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: 'Username / Password cannot be empty' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid Username / Password' }, { status: 401 });
    }

    if (user.choice !== 0) {
      return NextResponse.json({ message: 'User has already voted' }, { status: 403 });
    }

    return NextResponse.json(
      {
        message: 'Login successful',
        username: user.username,
        fullname: user.fullname,
        status: user.status
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
