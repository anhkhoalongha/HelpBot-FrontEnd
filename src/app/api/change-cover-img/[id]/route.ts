import { fetchData } from '@/utils/server/request';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetchData(
    `/api/v1/manage-project/project/${params.id}/`,
    'PUT',
    {},
    { avt_img: request.body },
  );
  return res;
}
