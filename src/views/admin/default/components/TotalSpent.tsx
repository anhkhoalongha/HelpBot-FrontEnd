// Chakra imports
import { Box, Button, Flex, Icon, Select, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '@/components/card/Card';
import LineChart from '@/components/charts/LineChart';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent, lineChartDataTotalSpent12Months, lineChartOptionsTotalSpent12Months } from '@/variables/charts';
import { fetchData } from "@/utils/server/request";

export default function TotalSpent(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

  const [mounted, setMounted] = useState(false);
  const [totalMessage, setTotalMessage] = useState('Loading...')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const GetTotalMessage = async () => {
    const res = await fetch('/api/list-message/');
    const data = await res.json();
    setTotalMessage(data.length)
  }
  GetTotalMessage()

  const [selectedOption, setSelectedOption] = useState('last7days');

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' height='160%' mb='0px' {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px' w='100%'>
        <Flex align='center' w='100%'>
          <Icon
            as={MdOutlineCalendarToday}
            color={textColorSecondary}
            me='4px'
            fontSize='24px'
          />
          <Select
            width={'10%'}
            value={selectedOption}
            onChange={handleSelectChange} bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <option value='last7days'>Last 12 months</option>
            <option value='last12months'>Last 7 days</option>
          </Select>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text color={textColor} fontSize='34px' textAlign='start' fontWeight='700' lineHeight='100%'>
            {totalMessage}
          </Text>


          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>

          <Box minH='260px' minW='75%' mt='auto'>
            {selectedOption !== 'last7days'
              ? <LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
              : <LineChart chartData={lineChartDataTotalSpent12Months} chartOptions={lineChartOptionsTotalSpent12Months} />
            }
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}
