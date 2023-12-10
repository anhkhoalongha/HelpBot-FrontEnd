import { fetchData } from '@/utils/server/request';

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const req = await request.json();
  const id = params.slug;
  const res = await fetchData(
    `/api/v1/manage-project/project/${id}/`,
    'PUT',
    {},
    { flow_chart: req },
  );
  return res;
}
