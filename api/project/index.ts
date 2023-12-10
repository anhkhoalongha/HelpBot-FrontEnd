import { request } from 'api/base';

import type Project from '@/types/project';

export async function getProjectList() {
  const data = await request<Project[]>('GET', '/api/list-project');
  return data;
}
export async function getProject(id: string) {
  if (!id) return null;
  const data = await request<Project>('GET', `/api/get-project/${id}`);
  return data;
}
