import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Game } from '@/lib/models/Game';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const genre = searchParams.get('genre');
    const platform = searchParams.get('platform');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || '-guideCount';

    const query: Record<string, unknown> = {};
    if (featured === 'true') query.featured = true;
    if (genre) query.genres = genre;
    if (platform) query.platforms = platform;

    const total = await Game.countDocuments(query);
    const games = await Game.find(query)
      .sort({ [sort]: -1 } as Record<string, 1 | -1>)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: games,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}