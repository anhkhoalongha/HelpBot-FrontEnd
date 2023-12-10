import type { NextRequest } from 'next/server';

import { fetchData } from '@/utils/server/request';

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await fetchData(`/api/project/${id}`, 'GET');
  return res;
}
