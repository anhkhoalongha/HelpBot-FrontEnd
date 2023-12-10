// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  AspectRatio
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/card/Card';
import { Image } from '@/components/image/Image';
import Popup from 'reactjs-popup';
// Assets
import { useRef, useState } from 'react';
import { IoTrash } from 'react-icons/io5';
import useProjectStore from '@/store/projectStore';
import Project from '@/types/project';
import Nft1 from '@/img/nfts/Nft1.png';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TooltipRef = {
  close: () => void;
};

export default function ProjectItem(props: {
  project: Project
}) {
  const { project } = props;
  const image = Nft1.src
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue('navy.700', 'white');
  const ref = useRef<TooltipRef | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { projects, setProjects } = useProjectStore();

  const closeTooltip = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  const handleDeleteConfirm = async () => {
    setSelectedProject(project);
    setIsLoading(true);
    try {
      const res = fetch(`/api/delete-project/${project.id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res)
      const newProjects = projects.filter(item => item.id !== project.id)
      setProjects(newProjects)
      // router.push('/admin/manager-project')
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      toast.success('The project was deleted')
      setIsLoading(false);
      closeTooltip();
    }
  };


  const { selectedProject, setSelectedProject } = useProjectStore()
  const router = useRouter();
  return (
    <Card p='20px'>
      <Flex direction={{ base: 'column' }} justify='center'>
        <Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
          <AspectRatio ratio={7 / 5}>
            <Image src={image} w={'100%'} borderRadius='20px' alt='' />
          </AspectRatio>
          <Button
            position='absolute'
            bg='white'
            _hover={{ bg: 'whiteAlpha.900' }}
            _active={{ bg: 'white' }}
            _focus={{ bg: 'white' }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              setLike(!like);
            }}>

            <Popup
              ref={ref as any}
              trigger={
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={IoTrash}
                  color='brand.500'
                />
              }
              modal
              nested
            > <Box
              borderRadius={'6px'}
              pt={'2%'}
              pb={'2%'}
              className='xxx'
            >
                {isLoading ? 'Deleting...' : (
                  <Box>
                    <Text>
                      Are you sure want to delete this project?
                    </Text>
                    <Button
                      onClick={handleDeleteConfirm}
                      mt={4}
                      colorScheme='teal'
                      type='submit'
                      marginRight='5px'
                    >
                      Yes
                    </Button>
                    <Button
                      className="button"
                      onClick={closeTooltip}
                      mt={4}
                    >
                      Close
                    </Button>
                  </Box>
                )}

              </Box>
            </Popup>
          </Button>
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='center'
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row'
            }}
            mb='auto'>
            <Flex direction='column'>
              <Link
                onClick={() => {
                  setSelectedProject(project);
                  router.push(`/admin/script/${project.id}`)
                }}
                color={textColor}
                fontSize={{
                  base: 'xl',
                  md: 'lg',
                  lg: 'lg',
                  xl: 'lg',
                  '2xl': 'md',
                  '3xl': 'lg'
                }}
                mb='5px'
                textAlign='center'
                fontWeight='bold'
                me='14px'>
                {project.name}
              </Link>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
