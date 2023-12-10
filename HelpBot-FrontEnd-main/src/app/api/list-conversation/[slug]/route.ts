import { fetchData } from '@/utils/server/request';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const id = params.slug;
  const res = await fetchData(
    `/api/v1/manage-project/conversations/${id}/`,
    'GET',
  );
  return res;
}
