// Chakra Imports
import {
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from '@/components/menu/ItemContent';
import { SearchBar } from '@/components/navbar/searchBar/SearchBar';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
// Assets
import navImage from '@/img/layout/Navbar.png';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
// import { FaEthereum } from 'react-icons/fa';
import { Image } from '@/components/image/Image';
import { UserButton, useUser } from '@clerk/nextjs';
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from 'next/navigation'

export default function HeaderLinks(props: {
  secondary: boolean,
  req: NextApiRequest,
  res: NextApiResponse
}) {
  const { secondary } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  // const ethColor = useColorModeValue('gray.700', 'white');
  // const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  // const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter()
  useEffect(() => {
    if (isSignedIn==false) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}>
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me='10px'
        borderRadius='30px'
      />

      <Menu>
        <MenuButton p='0px'>
          <Icon mt='6px' as={MdNotificationsNone} color={navbarIcon} w='18px' h='18px' me='10px' />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}>
          <Flex w='100%' mb='20px'>
            <Text fontSize='md' fontWeight='600' color={textColor}>
              Notifications
            </Text>
            <Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection='column'>
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
              <ItemContent info='Horizon UI Dashboard PRO' />
            </MenuItem>
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
              <ItemContent info='Horizon Design System Free' />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton p='0px'>
          <Icon mt='6px' as={MdInfoOutline} color={navbarIcon} w='18px' h='18px' me='10px' />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          me={{ base: '30px', md: 'unset' }}
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          minW={{ base: 'unset' }}
          maxW={{ base: '360px', md: 'unset' }}>
          <Image src={navImage} borderRadius='16px' mb='28px' />
          <Flex flexDirection='column'>
            <Link w='100%' href='https://horizon-ui.com/pro'>
              <Button w='100%' h='44px' mb='10px' variant='brand'>
                Buy Horizon UI PRO
              </Button>
            </Link>
            <Link w='100%' href='https://horizon-ui.com/documentation/docs/introduction'>
              <Button
                w='100%'
                h='44px'
                mb='10px'
                border='1px solid'
                bg='transparent'
                borderColor={borderButton}>
                See Documentation
              </Button>
            </Link>
            <Link w='100%' href='https://github.com/horizon-ui/horizon-ui-chakra-nextjs'>
              <Button w='100%' h='44px' variant='no-hover' color={textColor} bg='transparent'>
                Try Horizon Free
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      <UserButton></UserButton>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func
};
