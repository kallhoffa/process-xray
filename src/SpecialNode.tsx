import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import Button from '@material-ui/core/Button';

import { Handle, Position, NodeProps } from 'react-flow-renderer';

// const handleNodeClick = (event: any) => {
//   console.log("click")
// };




const SpecialNode : FC<NodeProps> = ({ data, isConnectable}: any) => {
  const [expanded, setExpanded]: any = useState(false);

  const handleExpandClick = (event: any) => {
    setExpanded(!expanded)
  }

  var expandedTest = ""

  if( expanded){
    expandedTest = "hey"
  }

  return (
    <div >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        New Node 
      </div>
      <Button
          variant="contained"
          color="primary"
          onClick={handleExpandClick}
        >
          Expand
        </Button>
        <div>
        {expandedTest}
        </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(SpecialNode)