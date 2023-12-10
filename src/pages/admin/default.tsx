/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { ChatIcon } from '@chakra-ui/icons';
import { Box, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { MdBarChart } from 'react-icons/md';

// Assets
// Custom components
import MiniStatistics from '@/components/card/MiniStatistics';
import IconBox from '@/components/icons/IconBox';
import AdminLayout from '@/layouts/admin';
import TotalSpent from '@/views/admin/default/components/TotalSpent';

export default function UserReports() {
  // clerk
  // state
  const [numberProjects, setNumberProjects] = useState('Loading...');
  const [numberRooms, setNumberRooms] = useState('Loading...');
  const [numberMessages, setNumberMessages] = useState('Loading...');

  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // fetch data

  const getNumberOfProject = async () => {
    const res = await fetch('/api/list-project/');
    const data = await res.json();
    if (Array.isArray(data)) {
      const numberOfProjects = `${data.length}`;
      setNumberProjects(numberOfProjects);
    } else {
      throw new Error('Invalidated');
    }
  };
  const getNumberOfRoom = async () => {
    const res = await fetch('/api/get-room/');
    const data = await res.json();
    if (Array.isArray(data)) {
      const numberOfRooms = `${data.length}`;
      setNumberRooms(numberOfRooms);
    } else {
      throw new Error('Invalidated');
    }
  };

  const getNumberOfMessage = async () => {
    await fetch(`/api/list-message/`)
      .then((res) => res.json())
      .then((data) => {
        const numberOfMessage = `${data.length}`;
        setNumberMessages(numberOfMessage);
      });
    // if (Array.isArray(data)) {
    //   const numberOfMessage = `${data.length}`;
    //   setNumberMessages(numberOfMessage);
    // } else {
    //   throw new Error('Invalidated');
    // }
  };
  getNumberOfProject();
  getNumberOfRoom();
  getNumberOfMessage();

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Number of project"
              value={numberProjects}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={ChatIcon} color={brandColor} />
                  }
                />
              }
              name="Amount of interaction"
              value={numberRooms}
            />
            <MiniStatistics
              growth="+23%"
              name="Total message"
              value={numberMessages}
            />
          </SimpleGrid>

          <SimpleGrid>
            <TotalSpent />
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}
