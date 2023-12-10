import 'reactflow/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import './inputNode.css';

import {
  Box,
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { getProject } from 'api/project';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import type { Connection, Edge, Node, ReactFlowInstance } from 'reactflow';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';

import ChoiceUpdateNode from '@/components/card/popup/NextQuestion/choiceNode ';
import TextUpdaterNode from '@/components/card/popup/NextQuestion/inputNode';
import ProjectLayout from '@/layouts/project';
import useProjectStore from '@/store/projectStore';
import styles from '@/styles/Banner.module.css';
import type { Query } from '@/types/base';
import type Project from '@/types/project';

const initialNodes: Node<any, string | undefined>[] = [];
const initialEdges: Edge<any>[] = [];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  choiceUpdater: ChoiceUpdateNode,
};

function FlowChartScript() {
  const { selectedProject, setSelectedProject } = useProjectStore();
  const router = useRouter();
  const { slug } = router.query as Query;
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const notify = () => toast.success('Script was changed successful!');
  useEffect(() => {
    const fetchDataAsync = async () => {
      const project = await getProject(slug);
      setSelectedProject(project);
    };
    fetchDataAsync();
  }, [slug]);
  // Flow chart
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const { setViewport } = useReactFlow();
  const handleAddTextNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'textUpdater',
      position: {
        x: 100,
        y: 100,
      },
      data: {
        id: `node-${nodes.length + 1}`,
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    };

    setNodes([...nodes, newNode]);
  };

  const handleAddChoiceNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'choiceUpdater',
      position: {
        x: 150,
        y: 100,
      },
      data: {
        value: {
          id: `node-${nodes.length + 1}`,
        },
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    };

    setNodes([...nodes, newNode]);
  };

  const onSave = useCallback(async () => {
    if (rfInstance) {
      /* eslint-disable @typescript-eslint/naming-convention */
      const flowChart = rfInstance.toObject();
      for (const node of flowChart.nodes) {
        try {
          node.data.question = JSON.parse(localStorage.getItem(node.id) || '');
        } catch {
          console.log(node.data.question);
        }
      }
      localStorage.setItem('flowChart', JSON.stringify(flowChart));
      await fetch(`/api/save-flow-chart/${slug}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowChart),
      });
      const editedProject = { ...selectedProject, flow_chart: flowChart };
      setSelectedProject(editedProject as Project);
      notify();
    }
  }, [rfInstance, slug]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      let flow = null;
      if (selectedProject) {
        flow = selectedProject.flow_chart;
      }
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, selectedProject]);

  useEffect(() => {
    onRestore();
  }, [selectedProject]);

  return (
    <ProjectLayout>
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
              className={styles.bgImage}
              direction="column"
              // bgImage={banner}
              bgSize="cover"
              py={{ base: '30px', md: '56px' }}
              px={{ base: '30px', md: '64px' }}
              borderRadius="30px"
            >
              <Text
                fontSize={{ base: '24px', md: '34px' }}
                color="#313c78"
                mb="14px"
                maxW={{
                  base: '100%',
                  md: '64%',
                  lg: '46%',
                  xl: '70%',
                  '2xl': '50%',
                  '3xl': '42%',
                }}
                fontWeight="700"
                lineHeight={{ base: '32px', md: '42px' }}
              >
                {selectedProject ? selectedProject.name : 'loading...'}
              </Text>
              <Text
                fontSize="md"
                color="#313c78"
                maxW={{
                  base: '100%',
                  md: '64%',
                  lg: '40%',
                  xl: '56%',
                  '2xl': '46%',
                  '3xl': '34%',
                }}
                fontWeight="500"
                mb="40px"
                lineHeight="28px"
              >
                Generate your script chatbot
              </Text>
            </Flex>
            <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
              Script flow
            </Text>
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
                  <div
                    style={{
                      width: '80vw',
                      height: '100vh',
                      backgroundColor: 'white',
                    }}
                  >
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      onInit={setRfInstance}
                      nodeTypes={nodeTypes}
                    >
                      <Controls />
                      <MiniMap />
                      <Background
                        variant={BackgroundVariant.Dots}
                        gap={12}
                        size={1}
                      />
                      <Panel position="top-right">
                        <Box>
                          <Button
                            onClick={onSave}
                            backgroundColor="#f4f7fe"
                            borderRadius="5px"
                            border="1px black"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleAddChoiceNode}
                            backgroundColor="#f4f7fe"
                            borderRadius="5px"
                          >
                            Add Multiple Choice Questions
                          </Button>
                          <Button
                            onClick={onRestore}
                            backgroundColor="#f4f7fe"
                            borderRadius="5px"
                          >
                            Load
                          </Button>
                          <Button
                            onClick={handleAddTextNode}
                            backgroundColor="#f4f7fe"
                            borderRadius="5px"
                          >
                            Add text question
                          </Button>
                        </Box>
                      </Panel>
                    </ReactFlow>
                  </div>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" />
            </Flex>
          </Flex>
        </Grid>
      </Box>
      <ToastContainer />
    </ProjectLayout>
  );
}

const FlowChartScriptQA = () => (
  <ReactFlowProvider>
    <FlowChartScript />
  </ReactFlowProvider>
);

export default FlowChartScriptQA;
