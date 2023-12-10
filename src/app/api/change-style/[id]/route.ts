import { fetchData } from '@/utils/server/request';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const req = await request.json();
  const res = await fetchData(
    `/api/v1/manage-project/project/${params.id}/`,
    'PUT',
    {},
    { style_widget: req },
  );
  return res;
}
