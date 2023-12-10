import { fetchData } from '@/utils/server/request';

export async function GET() {
  const res = await fetchData('/api/v1/manage-project/project/', 'GET');
  return res;
}
