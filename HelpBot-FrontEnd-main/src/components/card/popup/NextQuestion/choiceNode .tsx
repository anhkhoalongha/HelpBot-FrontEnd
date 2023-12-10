import { ChangeEventHandler, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

type Question = {
  question: {
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
  }
}
type DataType = {
  value: {id: string;};
  question?: Question;
}
const initialQuestion = {
  question: "",
  answer1: "",
  answer2: "",
  answer3: "",
}
function ChoiceUpdateNode(props: { data: DataType, isConnectable?: boolean }) {
  const { data, isConnectable } = props;
  const initialData = data?.question?.question || initialQuestion;
  const [formData, setFormData] = useState({
    question: initialData.question || '',
    answer1: initialData.answer1 || '',
    answer2: initialData.answer2 || '',
    answer3: initialData.answer3 || ''
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    const { name, value } = evt.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  }, []);

  localStorage.setItem(data.value.id, JSON.stringify({
    "question": formData,
    "type": "choice"
  }))
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Question:</label>
        <div className="input-question">
          <input
            id="text"
            name="question"
            defaultValue={formData.question}
            value={formData.question}
            onChange={onChange}
            className="nodrag"
            placeholder='Input question'
          />
        </div>
        <label>Answers:</label>
        <div>
          <input
            id="answer1"
            name="answer1"
            defaultValue={formData.answer1}
            // value={formData.answer1}
            onChange={onChange}
            className="nodrag"
            placeholder='Input answer'
          /><br />
          <input
            id="answer2"
            name="answer2"
            defaultValue={formData.answer2}
            // value={formData.answer2}
            onChange={onChange}
            className="nodrag"
            placeholder='Input answer'
          /><br />
          <input
            id="answer3"
            name="answer3"
            defaultValue={formData.answer3}
            // value={formData.answer3}
            onChange={onChange}
            className="nodrag"
            placeholder='Input answer'
          /><br />
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
      <Handle type="source" style={{ bottom: 45, top: 'auto', background: '#555' }} position={Position.Right} id="c" isConnectable={isConnectable} />
      <Handle type="source" style={{ bottom: 20, top: 'auto', background: '#555' }} position={Position.Right} id="d" isConnectable={isConnectable} />
    </div>
  );
}

export default ChoiceUpdateNode;
