import { getProject } from 'api/project';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CustomStyleWidget from '@/components/CustomStyleWidget/CustomStyleWidget';
import ProjectLayout from '@/layouts/project';
import useProjectStore from '@/store/projectStore';
import type { Query } from '@/types/base';

const Index = () => {
  const router = useRouter();
  const { slug } = router.query as Query;
  const { setSelectedProject } = useProjectStore();
  useEffect(() => {
    const fetchDataAsync = async () => {
      const project = await getProject(slug);
      setSelectedProject(project);
    };
    fetchDataAsync();
  }, [setSelectedProject, slug]);
  return (
    <ProjectLayout>
      <CustomStyleWidget />
    </ProjectLayout>
  );
};

export default Index;
