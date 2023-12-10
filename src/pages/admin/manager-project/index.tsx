import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import React, { useEffect } from 'react';

import ProjectItem from '@/components/card/ProjectItem';
// Assets
import AdminLayout from '@/layouts/admin';
import useProjectStore from '@/store/projectStore';
// Custom components
import Banner from '@/views/admin/marketplace/components/Banner';

export default function ManageChatBot() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const [projects, setProjects] = useState<Project[]>([]);
  const { projects, setProjects, setSelectedProject } = useProjectStore();

  useEffect(() => {
    setSelectedProject(undefined);
    fetch(`/api/list-project`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, [setProjects, setSelectedProject]);

  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Chatbot list
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 5 }} gap="20px">
              {Array.isArray(projects) &&
                projects.map((project) => (
                  <ProjectItem project={project} key={project.id} />
                ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Box>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </AdminLayout>
  );
}
