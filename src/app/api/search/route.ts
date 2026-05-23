import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Guide } from '@/lib/models/Guide';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Search query must be at least 2 characters',
      });
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const guides = await Guide.find(
      {
        published: true,
        $text: { $search: query },
      },
      { score: { $meta: 'textScore' } }
    )
      .select('title excerpt slug gameSlug gameTitle difficulty publishedAt tags')
      .sort({ score: { $meta: 'textScore' } })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Guide.countDocuments({
      published: true,
      $text: { $search: query },
    });

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
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}