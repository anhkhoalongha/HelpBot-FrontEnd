import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type Project from '@/types/project';

type ProjectStore = {
  projects: Project[] | [];
  selectedProject: Project | null;
  setProjects: (project?: Project[]) => void;
  setSelectedProject: (project?: Project | null) => void;
};

const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      selectedProject: null,
      setProjects: (projects?: Project[]) =>
        set(() => ({ projects: projects || [] })),
      setSelectedProject: (project) =>
        set(() => ({ selectedProject: project })),
    }),
    {
      name: 'ProjectStore', // name of the item in the storage (must be unique)
    },
  ),
);

export default useProjectStore;
