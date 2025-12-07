import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      where: {
        choice: 0
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(
      {
        message: 'Users who have not voted fetched successfully',
        total: users.length,
        users
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
