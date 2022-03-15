import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Box, Input, Button,  TextField } from '@mui/material';
// const handleNodeClick = (event: any) => {
//   console.log("click")
// };



const SpecialNode : FC<NodeProps> = ({ data, isConnectable}: any) => {
  const [expanded, setExpanded]: any = useState(false);

  const handleExpandClick = (event: any) => {
    setExpanded(!expanded)
  }

  var expandedTest = <></>

  if( expanded){
    expandedTest =  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { marginTop: 2 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          sx={{
            '& .MuiInputLabel-root': {fontSize: '10px'},
            '& .MuiInputBase-root': {fontSize: '10px'},
          }}
          multiline
        />
        </div>
  </Box>
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
        <Input 
          defaultValue="New Node" 
          disableUnderline={true}
          sx = {{
            fontSize: 12,
          }}/>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExpandClick}
        sx = {{
          fontSize: 8,
          padding: 0,
        }}
        >
          Expand
        </Button>
        <Box 
          sx={{
            fontSize: '6px',
          }}>
        {expandedTest}
        </Box>
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