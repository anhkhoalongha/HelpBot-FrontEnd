import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Assets
import AdminLayout from '@/layouts/admin';
import type { Query } from '@/types/base';
import type Conversation from '@/types/conversation';
// import type { Project } from 'reactflow';
import type Project from '@/types/project';
// Custom components

export default function ManageChatBot() {
  const router = useRouter();
  const { slug } = router.query as Query;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [project, setProject] = useState<Project>();
  const [filter, setFilter] = useState('all');
  const [date, setDate] = useState('');

  const convertDateTime = (dateTime: string) => {
    const timestamp = new Date(dateTime);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (slug) {
      fetch(`/api/list-conversation/${slug}/`)
        .then((res) => res.json())
        .then((data: Conversation[]) => {
          data.sort(
            (conv_a: Conversation, conv_b: Conversation) =>
              new Date(conv_b.earliest_time).getTime() -
              new Date(conv_a.earliest_time).getTime(),
          );
          setConversations(data);
        });
      fetch(`/api/get-project/${slug}/`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        });
    }
  }, [slug]);

  const filteredConversations = conversations?.filter((conversation) => {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 7);

    const conversationDate = new Date(conversation.earliest_time);

    switch (filter) {
      case 'last7days':
        return conversationDate >= daysAgo;
      case 'last1month':
        daysAgo.setDate(daysAgo.getDate() - 30);
        return conversationDate >= daysAgo;
      case 'all':
        if (date !== '') {
          const selectedDate = new Date(date);
          const isSameDate =
            conversationDate.getDate() === selectedDate.getDate() &&
            conversationDate.getMonth() === selectedDate.getMonth() &&
            conversationDate.getFullYear() === selectedDate.getFullYear();

          return isSameDate;
        }
        return true;
      default:
        return true;
    }
  });

  const handleDetailButtonClick = (id: any) => {
    router.push(`/chat-history/${id}`);
  };

  return (
    <AdminLayout>
      <Box pt={{ base: '100%', md: '80px', xl: '80px' }} mb="2%">
        {project ? (
          <Text fontSize="4xl">Conversations of {project?.name}</Text>
        ) : (
          <Text>Loading...</Text>
        )}

        <Flex
          mt="2%"
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <Box mb="4" display="flex" alignItems="center">
            <Select
              ml="2%"
              w="15%"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setDate('');
              }}
            >
              <option value="all">All</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last1month">Last 1 Month</option>
            </Select>
            <Input
              ml="1%"
              w="15%"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setFilter('all');
              }}
            />
            <Button
              ml="1%"
              colorScheme="teal"
              onClick={() => {
                setDate('');
                setFilter('all');
              }}
            >
              Reset
            </Button>
          </Box>
          <Flex direction="column">
            <Box ml="2%">
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th textAlign="left">Conversation ID</Th>
                      <Th textAlign="left">Created at</Th>
                      <Th textAlign="left" />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Array.isArray(filteredConversations) &&
                      filteredConversations.map((conversation) => (
                        <Tr key={conversation.conversation}>
                          <Td>{conversation?.conversation}</Td>
                          <Td>{convertDateTime(conversation.earliest_time)}</Td>
                          <Td>
                            <Button
                              onClick={() =>
                                handleDetailButtonClick(
                                  conversation.conversation,
                                )
                              }
                            >
                              Detail
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </AdminLayout>
  );
}
