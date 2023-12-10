// Chakra imports
import { Flex, Text } from '@chakra-ui/react'
import styles from '@/styles/Banner.module.css'
import CreateNewProject from './CreateProject';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      className={styles.bgImage}
      direction='column'
      // bgImage={banner}
      bgSize='cover'
      py={{ base: '30px', md: '56px' }}
      px={{ base: '30px', md: '64px' }}
      borderRadius='30px'
    >
      <Text
        fontSize={{ base: '24px', md: '34px' }}
        color='#313c78'
        mb='14px'
        maxW={{
          base: '100%',
          md: '64%',
          lg: '46%',
          xl: '70%',
          '2xl': '50%',
          '3xl': '42%'
        }}
        fontWeight='700'
        lineHeight={{ base: '32px', md: '42px' }}
      >
        Manage your chatbot
      </Text>
      <Flex align='center'>
        <CreateNewProject />
      </Flex>
      <ToastContainer />
    </Flex>

  )
}
