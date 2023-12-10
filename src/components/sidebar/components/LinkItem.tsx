/* eslint-disable */

// chakra imports
'use client';
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'


type props = {
  url: string;
  activeUrl: string;
  title: string;
}

const LinkItem = (props: props) => {
  const { url, activeUrl, title } = props;
  const router = useRouter()
  let activeColor = useColorModeValue('gray.700', 'white')
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600'
  )
  let activeIcon = useColorModeValue('brand.500', 'white')
  let textColor = useColorModeValue('secondaryGray.500', 'white')
  let brandColor = useColorModeValue('brand.500', 'brand.400')
  // let textLogoutColor = useColorModeValue('red.500', 'red.200')

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName)
  }
  const isActive = activeRoute(activeUrl);
  const fontWeight = isActive ? 'bold' : 'normal';

  return (
    <Box cursor="pointer" onClick={() => router.push(url)}>
      {isActive ? (
        <Box>
          <HStack
            spacing={isActive ? '22px' : '26px'}
            py='5px'
            ps='10px'
          >
            <Flex w='100%' alignItems='center' justifyContent='center'>
              <Box
                color={
                  isActive
                    ? activeIcon
                    : textColor
                }
                me='18px'
              >
              </Box>
              <Text
                me='auto'
                color={
                  isActive
                    ? activeColor
                    : textColor
                }
                fontWeight={
                  isActive
                    ? 'bold'
                    : 'normal'
                }
              >
                {title}
              </Text>
            </Flex>
            <Box
              h='36px'
              w='4px'
              bg={
                isActive
                  ? brandColor
                  : 'transparent'
              }
              borderRadius='5px'
            />
          </HStack>
        </Box>
      ) : (
        <Box>
          <HStack
            spacing={
              isActive ? '22px' : '26px'
            }
            py='5px'
            ps='10px'
          >
            <Text
              me='auto'
              color={
                isActive
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                isActive
                  ? 'bold'
                  : 'normal'
              }
            >
              {title}
            </Text>
            <Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default LinkItem;
