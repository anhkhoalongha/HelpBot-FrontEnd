"use client"
import React, { useEffect, useState } from 'react';
import { AbsoluteCenter, Avatar, AvatarBadge, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { Box, Input, Button } from '@chakra-ui/react';
import Navbar from '../Home/NavBar/Navbar';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import Message from '@/types/messages';

import { useRouter } from 'next/navigation'
import MessageHistory from '@/types/message_history';

const HistoryChatWidget = (props: { conversationID?: string }) => {

  //Send message
  const [messages, setMessages] = useState<MessageHistory[]>([]);
  const [initPage, setInitPage] = useState(true);
  const [style, setStyle] = useState<any>();
  const [avatar, setAvatar] = useState<string>();
  const router = useRouter();
  const { conversationID } = props
  console.log(conversationID)
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`/api/message-conversation/${conversationID}/`)
        const data = await response.json();

        console.log('data:', data.reverse())
        setMessages(data.reverse().sort((a: MessageHistory, b: MessageHistory) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
      } catch {
        console.log('Fetch conversation fail');
      }

      try {
        const response = await fetch(`/api/get-style-conversation/${conversationID}/`)
        const data = await response.json();
        setStyle(data.style_widget)
        setAvatar(data.avt_img)
      } catch {
        console.log('Fetch style conversation fail');
      }
    };

    fetchDataAsync();
    setInitPage(true)
  }, [conversationID])
  console.log('style', style)

  const checkSenderAdmin = (message: string) => {
    if (message.includes('Frontend')) {
      return false
    }
    return true;
  }

  return (
    <ChakraProvider>
      <Header />
      <Navbar />
      <Box
        className='chat-section'
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="4%"
        marginBottom="30%"
        borderRadius="8px"
      >
        <Box
          className='chatbox-area'
          w="400px"
          border="1px solid #ccc"
          padding="6px"
          bg="cyan.100"
        >
          <Box>
            <Box textAlign="left" mt="5%" display="inline">
              <Flex
                w="100%">
                <Avatar
                  size="lg"
                  name="Dan Abrahmov"
                  src={avatar ? `${process.env.NEXT_PUBLIC_BASE_URL}/${avatar}` : "https://bit.ly/dan-abramov"}>
                  <AvatarBadge
                    boxSize="1.25em"
                    bg="green.500" />
                </Avatar>
                <Flex flexDirection="column" mx="5" justify="center">
                  <Text fontSize="lg" fontWeight="bold">
                    {style?.title ? style.title : 'no-name'}
                  </Text>
                  <Text color="green.500">Online</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              id='chatbox'
              h="600px"
              border="1px solid #ccc"
              overflowY="scroll"
              bg={style ? style.color : '#red-color'}
              borderRadius="8px"
            >
              {messages.map((message, index) => (
                <Box display="block"
                  key={index}
                  width="100%"
                  className='messageBox'  >

                  <Box
                    className='message'
                    key={index}
                    p="5px"
                    borderBottom="1px solid #ccc"
                    bg={!checkSenderAdmin(message?.content) ? '#fff' : '#e1f5fe'}
                    marginBottom="10px"
                    marginTop="10px"
                    marginLeft={!checkSenderAdmin(message?.content) ? '1%' : '80%'}
                    marginRight={checkSenderAdmin(message?.content) ? '2%' : '10%'}
                    float={checkSenderAdmin(message?.content) ? 'right' : 'left'}
                    display="inline-block"
                    borderRadius="8px"
                    padding='10px'
                    maxWidth="65%"
                    w={message.content.length > 6 ? 288 : 150}
                    overflowWrap="break-word"
                  >
                    {message?.content?.split('-')?.pop()?.split(':')?.pop()}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
    </ChakraProvider>
  );
};

export default HistoryChatWidget;