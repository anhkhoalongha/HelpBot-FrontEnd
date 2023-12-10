import type BodyRoom from '@/types/bodyAPICreateRoom';
import { fetchData } from '@/utils/server/request';

export async function POST(request: Request) {
  const { id } = (await request.json()) as BodyRoom;

  const res = await fetchData(
    `/api/v1/manage-project/room/`,
    'POST',
    {},
    { project: id },
  );
  return res;
}
