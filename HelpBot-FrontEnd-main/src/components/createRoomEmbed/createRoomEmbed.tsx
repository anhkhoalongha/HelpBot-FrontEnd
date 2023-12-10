"use client"
import { fetchData } from "@/utils/server/request";
import { Center, ChakraProvider, Text } from "@chakra-ui/react";
import { Box, Button, Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'
import { useState } from "react";

let idRoom = null
const CreateRoom = () => {
  const [idProject, setIdProject] = useState('1')
  const router = useRouter();

  const callAPI = async () => {

    try {
      const response = await fetch('api/post-room');
      const data = await response.json();
      idRoom = data['id_synapse']
      if (data['id_synapse']) {
        router.push('/chatEmbed')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ChakraProvider>
        <Box marginTop="10%" alignContent="center">
          <Center bg="white" color="black">
            <Text fontSize='6xl'>Create new room</Text>
          </Center>
        </Box>
        <Box marginTop="2%" alignContent="center">
          <Center bg="white" color="white">
            <Select
              bg="white"
              borderColor="black"
              mx="auto"
              color="black"
              w={"50%"}
              onChange={(e) => {
                setIdProject(e.target.value);
              }}
            >
              <option value="1">Computershop</option>
            </Select>
          </Center>
        </Box>
        <Box mt={"2%"} mr={"50%"} ml={"50%"} marginBottom="30%" alignContent="center">
          <Button
            colorScheme='teal'
            size='lg'
            onClick={callAPI}
          >
            Create Room
          </ Button>
        </Box>
      </ChakraProvider>
    </>
  );

}
export { idRoom };

export default CreateRoom;
