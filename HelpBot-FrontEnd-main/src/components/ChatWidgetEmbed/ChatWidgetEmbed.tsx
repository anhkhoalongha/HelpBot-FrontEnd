"use client"
import React, { useEffect, useState } from 'react';
import { AbsoluteCenter, Avatar, AvatarBadge, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { Box, Input, Button } from '@chakra-ui/react';
import sdk, { EmittedEvents, SyncState } from 'matrix-js-sdk';
import process from 'process';
import Message from '@/types/messages';
import { fetchData } from "@/utils/server/request";
import project, { Style } from '@/types/project';
// import { idRoom } from '../createRoomEmbed/createRoomEmbed';


const client = sdk.createClient({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL_SYNAPSE as string,
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER_SYNAPSE as string,
  userId: process.env.NEXT_PUBLIC_USER_ID_SYNAPSE as string
});


// @ts-ignore-start
client.once('sync' as EmittedEvents, function (state: SyncState, prevState: SyncState, res: ISyncStateData) {
  if (state === "PREPARED") {
    console.log("prepared");
  } else {
    console.log(state);
    process.exit(1);
  }
});

// @ts-ignore-end




client.startClient()


const ChatWidget = (props: { projectId?: string }) => {

  //Send message
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [initPage, setInitPage] = useState(true);
  const [answers, setAnswers] = useState([])
  const [style, setStyle] = useState<Style>();
  const [avatar, setAvatar] = useState<string>();
  const [idRoomChat, setIdRoomChat] = useState('')
  const { projectId } = props

  useEffect(() => {
    const fetchDataAndCreateRoom = async () => {
      try {
        const response = await fetch(`/api/get-project/${projectId}`);
        const data = await response.json();
        if (data !== undefined) {
          setStyle(data.style_widget);
          setAnswers(data['script_QA'][0]['answer']);
          setAvatar(data.avt_img);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      handleSendMessage('start');
      setInitPage(true);

      try {
        const response = await fetch(`/api/post-room/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: projectId}),
        });
        const data = await response.json();
        setIdRoomChat(data['id_synapse']);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataAndCreateRoom();
  }, [projectId]);
  // const idRoom = process.env.NEXT_PUBLIC_TEST_ROOM_SYNAPSE_ID;
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //SDK matrix listen


  const sendContent = (message: string) => {
    return (
      {
        "body": "Send from Nextjs Frontend at " + time + ':' + message,
        "time": time,
        "sender": 'user',
        "msgtype": "request"
      }
    );
  }

  const handleSendMessage = (content?: string) => {
    setInitPage(false)
    let message = currentMessage
    if (content) {
      message = content;
    }

    client.sendEvent(idRoomChat, "m.room.message", sendContent(message), "").then(() => {
      if (currentMessage.trim() !== '') {
        setMessages([...messages, { text: message, sender: 'user' }]);
      }
      else {
        if (message == 'start') {
          setMessages([...messages, { text: 'What do you need?', sender: 'bot' }]);
        }
        else {
          setMessages([...messages, { text: message, sender: 'user' }]);
        }

      }
    }).catch((err) => {
      console.log(err);
    });
    setCurrentMessage('');
    console.log('send successful')
  };

  // receive message
  client.on("event" as EmittedEvents, function (event: any) {
    if (initPage === false && event['event']['type'] == 'm.room.message') {
      const parts = event['event']['content']['body'].split('-');

      const time = parts[0];
      const content = parts[1];
      if (content) {
        setMessages([...messages, { text: content, sender: event.getSender() }]);
      }
    }
  })



  return (
    <ChakraProvider>
      <Box
        className='chat-section'
        w="100%"
        h='50%'
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="0%"
        marginBottom="0%"
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
                  src={avatar ? avatar : "https://bit.ly/dan-abramov"}>
                  <AvatarBadge
                    boxSize="1.25em"
                    bg="green.500" />
                </Avatar>
                <Flex flexDirection="column" mx="5" justify="center">
                  <Text fontSize="lg" fontWeight="bold">
                    {style ? style.title : 'no-name'}
                  </Text>
                  <Text color="green.500">Online</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              id='chatbox'
              h="370px"
              border="1px solid #ccc"
              overflowY="scroll"
              bg={style ? style.color : '#red-color'}
              borderRadius="8px"

            >
              {initPage === true ? (
                <Box
                  className='initButton'
                  width={"100%"}
                  alignContent={"center"}
                  alignItems={"center"}
                  position="relative"
                >
                  <AbsoluteCenter axis='both' marginTop="50%">
                    {answers.map((answer: string, index: number) => (
                      <Box
                        key={index}
                        marginTop={"15%"}
                        fontWeight={"thin"}
                      >
                        <Button
                          onClick={() => {
                            setInitPage(false);
                            handleSendMessage(answer);
                          }
                          }
                        >
                          {answer}
                        </Button>
                      </Box>
                    ))}
                  </AbsoluteCenter>
                </Box>
              )
                :
                (
                  <Box
                    display={"none"}
                  >                  </Box>
                )
              }

              {messages.map((message, index) => (
                <Box display="block"
                  key={index}
                  width="100%"
                  className='messageBox'  >
                  {message.sender !== 'user' ?
                    <Avatar
                      name="Computer"
                      src={avatar ? avatar : "https://bit.ly/dan-abramov"}
                      bg="blue.300"
                      marginLeft='5px'
                      marginTop='5px'
                    ></Avatar> : <Box>  </Box>
                  }
                  <Box
                    className='message'
                    key={index}
                    p="5px"
                    borderBottom="1px solid #ccc"
                    bg={message.sender === 'user' ? '#fff' : '#e1f5fe'}
                    marginBottom="10px"
                    marginTop="10px"
                    marginLeft={message.sender !== 'user' ? '1%' : '80%'}
                    marginRight={message.sender === 'user' ? '2%' : '10%'}
                    float={message.sender === 'user' ? 'right' : 'none'}
                    display="inline-block"
                    borderRadius="8px"
                    padding='10px'
                    maxWidth="65%"
                    w={message.text.length > 6 ? 288 : 150}
                    overflowWrap="break-word"
                    fontSize={style ? style.fontSize : '15'}
                  >

                    {message.text}

                  </Box>
                </Box>
              ))}

            </Box>
            <Box mt="10px" display="flex" alignItems="center" >
              <Input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                flex="1"
                border="1px"
                borderRadius="4px"
                p="8px"
                bg="#fff"
              />
              <Button
                onClick={() => {
                  handleSendMessage();
                }}
                ml="2"
                bg="#4caf50"
                color="#fff"
                borderRadius="4px"
                p="8px 16px"
                _hover={{
                  bg: "#45a049"
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ChatWidget;
