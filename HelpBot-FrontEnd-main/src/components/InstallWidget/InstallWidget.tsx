import { fetchData } from "@/utils/server/request";
import useProjectStore from "@/store/projectStore";
import Project from "@/types/project";
import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import CodeBox from "./CodeBox";

const InstallWidget = () => {
  const {selectedProject} = useProjectStore()

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <Flex
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


              {selectedProject ? selectedProject.name : 'Loading...'}


            </Text>
            <Text
              fontSize='md'
              color='#313c78'
              maxW={{
                base: '100%',
                md: '64%',
                lg: '40%',
                xl: '56%',
                '2xl': '46%',
                '3xl': '34%'
              }}
              fontWeight='500'
              mb='40px'
              lineHeight='28px'
            >
              Install to your website
            </Text>
          </Flex>

          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >

              <Flex
                align="center"
                me="20px"
                ms={{ base: '24px', md: '0px' }}
                mt={{ base: '20px', md: '0px' }}
              >
                <div style={{ width: '80vw', height: '100vh' }}>
                  {selectedProject ? (
                    <Box>
                      <CodeBox />
                    </Box>
                  ) :
                    <Box>Loading</Box>
                  }

                </div>
              </Flex>
            </Flex>

          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}
export default InstallWidget;
