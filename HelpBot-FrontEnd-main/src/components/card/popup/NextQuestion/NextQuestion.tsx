// import { fetchData } from '@/app/api/api-request/route';
// import { AddIcon } from '@chakra-ui/icons';
// import { Box, Button, Heading, Icon, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
// import React, { useRef, useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import { useCallback } from 'react';
// import ReactFlow, {
//   addEdge,
//   Background,
//   useNodesState,
//   useEdgesState,
//   MiniMap,
//   Controls,
//   Node,
//   Handle
// } from 'reactflow';
// import 'reactflow/dist/style.css';


export type FormValues = {
  question: string
  answer: Array<string>
}



// const NextQuestion = (parent?: number) => {
//   const ref = useRef(null);
//   const [questions, setQuestions] = useState<string[]>(['How are you today?'])
//   const [content, setContent] = useState<string>('')
//   const [choices, setChoices] = useState<string[]>([])
//   const [questionTypes, setQuestionTypes] = useState('text');

//   const handleTypeChange = (index, type) => {
//     setQuestionTypes(type);
//   };
//   const initialNodes = [
//     {
//       id: '2a',
//       data: { label: 'Node A.1' },
//       position: { x: 10, y: 50 },
//       parentNode: { parent },
//     }
//   ]
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     try {
//       const res = await fetchData('/api/v1/manage-project/question/', 'POST', {}, {
//         'question_text': data['question'],
//         'project': 1
//       })

//       const responseData = await res.json();
//       setContent(data['question']);;
//       if (responseData && data['choice'] && data['choice'].length > 0) {
//         setChoices(data['choice'])
//         data['choice'].map((answer: string, index: number) => {
//           fetchData('/api/v1/manage-project/answer/', 'POST', {}, {
//             'question': responseData['id'],
//             'answer_text': answer
//           })
//         })
//       }
//       else {
//         fetchData('/api/v1/manage-project/answer/', 'POST', {}, {
//           'question': responseData['id'],
//           'answer_text': ''
//         })
//       }
//       closeTooltip()

//     }
//     catch {
//       console.log('failure')
//     }
//   }


//   const closeTooltip = () => {
//     ref.current.close();
//   };


//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<Inputs>()


//   return (
//     <Popup
//       ref={ref}
//       trigger={
//         <Box className="buttonAddQuestion">
//           {content === '' ? <Icon as={AddIcon} /> : (
//             <Box
//               width={'100%'}
//             >
//               {content}
//             </Box>
//           )}
//           <Box>
//             {questionTypes === 'multichoice' ?
//               (
//                 choices.map((choice, index) => (
//                   <Box
//                     className='choice'
//                     key={index}
//                     mt={'1%'}
//                     display="block"
//                     border='1px'
//                     borderColor='#604bff'
//                     borderRadius={'5px'}
//                   >
//                     {choice}
//                   </Box>
//                 ))
//               ) :
//               (
//                 <Box>
//                 </Box>
//               )
//             }
//           </Box>
//         </Box>
//       }

//       modal
//       nested
//     >
//       <Heading as="h2" size="xl" mb={'3%'}>
//         Script chatbot next
//       </Heading>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {questions.map((question, index) => (
//           <div key={index}>
//             <Box mb={4}>
//               <label >Question {index}:</label>
//               <Input {...register("question")} type="text" placeholder="Question" defaultValue={question} />
//             </Box>
//             <Box mb={4}>
//               <label>Question type:</label>
//               <RadioGroup defaultValue="text">
//                 <Stack spacing={4} direction="row">
//                   <Radio value="text" onChange={() => handleTypeChange(index, 'text')}>
//                     Text
//                   </Radio>
//                   <Radio value="multichoice" onChange={() => handleTypeChange(index, 'multichoice')}>
//                     Multichoice
//                   </Radio>
//                 </Stack>
//               </RadioGroup>
//             </Box>

//             {questionTypes === 'multichoice' ? (
//               <Box mb={4}>
//                 <label>Choice:</label>
//                 <Box w={'100%'}>
//                   <Input  {...register("choice[0]")} type="text" placeholder="Choice 1" width={'30%'} />
//                   <Button>
//                     <Icon as={AddIcon} />
//                   </Button>
//                 </Box>
//                 <Box w={'100%'}>
//                   <Input  {...register("choice[1]")} type="text" placeholder="Choice 2" width={'30%'} />
//                   <Button>
//                     <Icon as={AddIcon} />
//                   </Button>
//                 </Box>
//                 <Box w={'100%'}>
//                   <Input  {...register("choice[2]")} type="text" placeholder="Choice 3" width={'30%'} />
//                   <Button>
//                     <Icon as={AddIcon} />
//                   </Button>
//                 </Box>
//               </Box>
//             ) : (
//               <Box mb={4}>
//                 <Button>
//                   <Icon as={AddIcon} />
//                 </Button>
//               </Box>
//             )}
//           </div>
//         ))}
//         <Box w={'100%'}>
//           <Button
//             colorScheme="teal"
//             type="submit">
//             Submit
//           </Button>
//         </Box>
//       </form>

//     </Popup >

//   );
// }
// export default NextQuestion;
