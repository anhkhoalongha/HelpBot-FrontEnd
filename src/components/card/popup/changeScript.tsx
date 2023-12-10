// import { fetchData } from '@/app/api/api-request/route';
// import { useForm, SubmitHandler } from "react-hook-form"
// import { Box, Button, Heading, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';

// import React, { useRef, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import { useCallback } from 'react';
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   MiniMap,
//   Panel,
//   useEdgesState,
//   useNodesState,
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import NextQuestion from './NextQuestion/NextQuestion';


// const initialNodes = [
//   { id: '1', position: { x: 50, y: 0 }, data: { label: <NextQuestion></NextQuestion> } },

// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export type FormValues = {
  question: string
  answer: Array<string>
}

// const ChangeScript = () => {
//   const ref = useRef(null);
//   const [questions, setQuestions] = useState<string[]>(['How are you today?'])
//   const [questionTypes, setQuestionTypes] = useState(Array(questions.length).fill('text'));
//   const [rfInstance, setRfInstance] = useState(null);
//   const handleTypeChange = (index, type) => {
//     const updatedTypes = [...questionTypes];
//     updatedTypes[index] = type;
//     setQuestionTypes(updatedTypes);
//   };

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//   const handleAddNode = () => {
//     const newNode = {
//       id: `new-node-${nodes.length + 1}`,
//       type: 'default', // Adjust type if necessary
//       position: {
//         x: Math.random() * window.innerWidth - 100,
//         y: Math.random() * window.innerHeight,
//       }, // Adjust initial position if necessary
//       data: { label: <NextQuestion></NextQuestion>, setValue: 1 } // Adjust label if necessary
//     };

//     setNodes([...nodes, newNode]);
//   };



//   const onSave = useCallback(() => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       localStorage.setItem(flowKey, JSON.stringify(flow));
//     }
//   }, [rfInstance]);





//   //Form
//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     const res = await fetchData('/api/v1/manage-project/question/', 'POST', {}, {
//       'question_text': data['question'],
//       'project': 1
//     })
//     const responseData = await res.json(); // Assuming the response is in JSON format

//     if (responseData && responseData['choice'] && responseData['choice'].length > 0) {
//       data['choice'].map((answer, index) => {
//         fetchData('/api/v1/manage-project/answer/', 'POST', {}, {
//           'question': responseData['id'],
//           'answer_text': answer
//         })
//       })
//     }
//     else {
//       fetchData('/api/v1/manage-project/answer/', 'POST', {}, {
//         'question': responseData['id'],
//         'answer_text': ''
//       })
//     }

//   }

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<Inputs>()


//   return (
//     <Popup
//       ref={ref}
//       trigger={<Button colorScheme="teal" className="button"> Detail </Button>}
//       modal
//       nested
//     >
//       <Heading as="h2" size="xl" mb={'3%'}>
//         Script chatbot
//       </Heading>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {questions.map((question, index) => (
//           <div key={index}>
//             <Box mb={4}>
//               <label >Question {index}:</label>
//               <Input {...register("question")} type="text" placeholder="Question" defaultValue={question} w={'40%'} />
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

//             {questionTypes[index] === 'multichoice' ? (
//               <Box mb={4}>
//                 <label>Choice:</label>
//                 <Box w={'100%'}>
//                   <Input {...register("choice[0]")} type="text" placeholder="Choice 1" width={'30%'} />
//                   <NextQuestion></NextQuestion>
//                 </Box>
//                 <Box w={'100%'} >
//                   <Input {...register("choice[1]")} type="text" placeholder="Choice 2" width={'30%'} />
//                   <NextQuestion></NextQuestion>
//                 </Box>
//                 <Box w={'100%'}>
//                   <Input {...register("choice[2]")} type="text" placeholder="Choice 3" width={'30%'} />
//                   <NextQuestion></NextQuestion>
//                 </Box>
//                 <Box w={'100%'} display={'none'}>
//                   <Input {...register("pre_answer")} type="text" placeholder="Choice 3" value={null} width={'30%'} />
//                   <NextQuestion></NextQuestion>
//                 </Box>
//               </Box>
//             ) : (
//               <Box pb={'3%'}>
//                 <NextQuestion></NextQuestion>
//               </Box>
//             )}
//           </div>
//         ))}
//         <input type="submit" style={{ border: '1px', background: 'teal.100', borderRadius: '5px/5px', padding: '10px', marginBottom: '5%' }} />
//       </form>
//       <div style={{ width: '100vw', height: '100vh' }}>
//         <button
//           onClick={handleAddNode}
//           style={{ border: '5px', 'backgroundColor': 'teal.100' }}>
//           Add question
//         </button>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//         >
//           <Controls />
//           <MiniMap />
//           <Background variant="dots" gap={12} size={1} />
//           <Panel position="top-right">
//             <button onClick={onSave}>Save</button>
//           </Panel>
//         </ReactFlow>
//       </div>
//     </Popup>
//   );
// }

// export default ChangeScript;
