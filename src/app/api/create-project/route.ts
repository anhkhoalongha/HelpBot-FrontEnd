import type BodyProject from '@/types/bodyAPICreateProject';
import { fetchData } from '@/utils/server/request';

export async function POST(request: Request) {
  const { name, owner } = (await request.json()) as BodyProject;

  const res = await fetchData(
    `/api/v1/manage-project/project/`,
    'POST',
    {},
    { name, owner },
  );
  return res;
}
