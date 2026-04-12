import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { paths } = (await request.json()) as { paths: string[] };

    if (!Array.isArray(paths) || paths.length === 0 || paths.length > 20) {
      return NextResponse.json({ error: 'paths: 1-20 items required' }, { status: 400 });
    }

    if (paths.some((p: unknown) => typeof p !== 'string' || !p.startsWith('/'))) {
      return NextResponse.json({ error: 'paths must start with /' }, { status: 400 });
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
