import { fetchData } from '@/utils/server/request';

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const id = params.slug;
  const res = await fetchData(
    `/api/v1/manage-project/project/${id}/`,
    'DELETE',
  );
  return res;
}
