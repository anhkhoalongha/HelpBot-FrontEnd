'use client';
import { Box, HStack, Flex, Text } from "@chakra-ui/react"
// import { useRouter } from "next/navigation"
import { useRouter } from 'next/router';
import { useRef } from "react";
import { MdLogout } from "react-icons/md"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const router = useRouter()
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName)
  }
  const linkRef = useRef(null);
  const activeIcon = undefined;
  const activeColor = undefined;
  const textColor = undefined;
  const brandColor = undefined;
  const inactiveColor = undefined;

  return (
    <Link to='/default' ref={linkRef}>
      {activeRoute('/default') ? (
        <Box>
          <HStack
            spacing={activeRoute('/default') ? '22px' : '26px'}
            py='5px'
            ps='10px'
          >
            <Flex w='100%' alignItems='center' justifyContent='center'>
              <Box
                color={
                  activeRoute('/default')
                    ? activeIcon
                    : textColor
                }
                me='18px'
              >
                <MdLogout />
              </Box>
              <Text
                me='auto'
                color={
                  activeRoute('/default')
                    ? activeColor
                    : textColor
                }
                fontWeight={
                  activeRoute('/default')
                    ? 'bold'
                    : 'normal'
                }
              >
                {'Chabot manager'}
              </Text>
            </Flex>
            <Box
              h='36px'
              w='4px'
              bg={
                activeRoute('/default')
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
              activeRoute('test') ? '22px' : '26px'
            }
            py='5px'
            ps='10px'
          >
            <Text
              me='auto'
              color={
                activeRoute('/default')
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                activeRoute('/default')
                  ? 'bold'
                  : 'normal'
              }
            >
              API Dashboard
            </Text>
            <Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
          </HStack>
        </Box>
      )}
    </Link>
  )
}

export default Dashboard;
