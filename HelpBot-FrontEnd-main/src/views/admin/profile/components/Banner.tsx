// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import { useUser } from "@clerk/nextjs";
import { Avatar } from '@chakra-ui/react'
import { useState } from 'react';
import { getProjectList } from 'api/project';

export default function Banner(props: {
  banner: string
  avatar: string
  name: string
  job: string
  posts: number | string
  followers: number | string
  following: number | string
  [x: string]: any
}) {
  const {
    banner,
    avatar,
    name,
    job,
    posts,
    followers,
    following,
    ...rest
  } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )
  const[numberOfProjects, setNumberProjects] = useState<number>(0)
  const { user } = useUser();
  const getNumberOfProject = async () => {
    const data = await getProjectList();
    if (Array.isArray(data)) {
      setNumberProjects(data.length);
    } else {
      throw new Error('Invalidated');
    }
  };
  getNumberOfProject()

  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
      <Avatar
        h='100px'
        w='100px'
        border='4px solid'
        borderColor={borderColor}
        name='Segun Adebayo'
        src={user?.imageUrl}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {user?.username}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {job}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {numberOfProjects}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Projects
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {followers}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Followers
          </Text>
        </Flex>
        <Flex mx='auto' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Following
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
