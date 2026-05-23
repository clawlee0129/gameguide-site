import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Guide } from '@/lib/models/Guide';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const gameSlug = searchParams.get('game');
    const difficulty = searchParams.get('difficulty');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort') || '-publishedAt';

    const query: Record<string, unknown> = { published: true };
    if (gameSlug) query.gameSlug = gameSlug;
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;

    const total = await Guide.countDocuments(query);
    const guides = await Guide.find(query)
      .select('-content -sections')
      .sort({ [sort]: -1 } as Record<string, 1 | -1>)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: guides,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}