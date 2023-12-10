import useProjectStore from "@/store/projectStore";
import { Box, Button, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState } from "react";
import process from "process";
type Props = {
  secretKey: string
};

const CodeBox = () => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const {selectedProject} = useProjectStore()
  const content = `
      const setSecretkey = () => {
        localStorage.setItem("secret_key", "${selectedProject?.secretkey}");
      }
      setSecretkey()
      var iframe = document.createElement('iframe');
      iframe.src = '${process.env.NEXT_PUBLIC_URL_DOMAIN}/chatEmbed/${ slug }';
      iframe.style.position = 'fixed';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
      iframe.style.width = '300px'; 
      iframe.style.height = '500px';

      document.body.appendChild(iframe);
    `
  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(content)
      .then(() => setCopied(true))
      .catch(err => console.error('Failed to copy', err));

  }
  return (
    <>
      <Box
        ml={'10%'}
        mb={'2%'}
      >
        <Text
          fontSize={'130%'}
        >
          Add widget.js at root folder in your project
        </Text>
      </Box>
      <Box
        width={'60%'}
        ml={'10%'}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={'#343541'}
          borderTopRadius={'5px'}
          padding={'1%'}
        >
          <Text
            color={'#ffff'}
            padding={'5px'}
          >
            widget.js
          </Text>
          <Button
            onClick={handleCopy}
            fontSize={'80%'}
            color={'white'}
            backgroundColor={'rgba(0,0,0,0.25)'}
            _hover={{
              color: 'black',
              backgroundColor: 'white'
            }}
          >
            Copy
          </Button>
        </Box>
        <Box
          as="pre"
          p="4"
          mb="8"
          borderBottomRadius="md"
          bg="gray.100"
          fontFamily="mono"
          fontSize="sm"
          color={'white'}
          overflowX="auto"
          backgroundColor={'black'}
        >
          {content}
        </Box>
      </Box>
    </>
  )
}

export default CodeBox;
