type NodeProps = {
  nodeData: {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { id: string; question: number }; // Thêm trường 'question'
    targetPosition: string;
    sourcePosition: string;
    positionAbsolute: { x: number; y: number };
  };
};
export default NodeProps;
