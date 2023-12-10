import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

type Data = {
  id: string;
  question?: {
    question: string;
  };
}

function TextUpdaterNode(props: { data: Data, isConnectable?: boolean }) {
  const { data, isConnectable } = props;
  const questionData = data?.question || { question: '' }
  const [question, setQuestion] = useState('');
  const onChange = (e: any) => {
    setQuestion(e.target.value);
    console.log(question);
    localStorage.setItem(data.id, JSON.stringify({
      "question": e.target.value,
      "type": "text"
    }));
  }

  return (
    <form>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
        <div>
          <label htmlFor="text">Question:</label>
          <div className="input-question">
            <input id="text" name="text"
              defaultValue={questionData.question || ''}
              onChange={onChange}
              // value={data.question.question}
              className="nodrag"
              placeholder='Input question' />
          </div>
        </div>
        <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
      </div>
    </form>
  );
}

export default memo(TextUpdaterNode);
