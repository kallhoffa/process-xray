import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Box, Input, Button,  TextField } from '@mui/material';
// const handleNodeClick = (event: any) => {
//   console.log("click")
// };

import CreateNode from './CreateNode'
import CreateEdge from './CreateEdge'

const SpecialNode : FC<NodeProps> = ({ data, id, xPos, yPos, isConnectable}: any) => {
  const [expanded, setExpanded]: any = useState(false);

  const elementsObject = data.elementsObject;


  const handleExpandClick = (event: any) => {
    setExpanded(!expanded)
  }

  const handleNewOutputClick = (event: any) => {

    const nodeX = xPos + 200;
    const nodeY = yPos;

    console.log(xPos, yPos)

    const newNodeId: string = CreateNode({nodeX, nodeY, inPixels:false, elementsObject})
    CreateEdge({source: id, target: newNodeId, elementsObject})
  }

  const handleNewInputClick = (event: any) => {

    const nodeX = xPos - 200;
    const nodeY = yPos;

    console.log(xPos, yPos)

    const newNodeId: string = CreateNode({nodeX, nodeY, inPixels:false, elementsObject})
    CreateEdge({source: newNodeId, target: id, elementsObject})
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
        <Button 
          onClick={handleNewInputClick}
          variant="contained"
          sx={{
            backgroundColor: '#555',
          }}
        />
        <Button 
          onClick={handleNewOutputClick}
          variant="contained"
          sx={{
            backgroundColor: '#555',
          }}
        />
        
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