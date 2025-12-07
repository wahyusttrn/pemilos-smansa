import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, choice } = body;

    if (!username || !choice) {
      return NextResponse.json({ message: 'Username / Choice cannot be empty' }, { status: 400 });
    }

    if (![1, 2].includes(Number(choice))) {
      return NextResponse.json({ message: 'Invalid choice value' }, { status: 400 });
    }

    const result = await prisma.user.updateMany({
      where: {
        username,
        choice: 0
      },
      data: {
        choice: Number(choice)
      }
    });

    if (result.count === 0) {
      return NextResponse.json({ message: 'Voting failed. User not found or already voted' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Vote submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const voteOne = await prisma.user.count({
      where: { choice: 1 }
    });

    const voteTwo = await prisma.user.count({
      where: { choice: 2 }
    });

    const notVoted = await prisma.user.count({
      where: { choice: 0 }
    });

    return NextResponse.json(
      {
        message: 'Voting result fetched successfully',
        result: {
          candidate1: voteOne,
          candidate2: voteTwo,
          notVoted: notVoted
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
