import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
import { Box, Input, IconButton, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

// const handleNodeClick = (event: any) => {
//   console.log("click")
// };

import createNode from '../utils/createNode'
import createEdge from '../utils/createEdge'

const SpecialNode : FC<NodeProps> = ({ data, id, xPos, yPos, isConnectable}: any) => {
  const [expanded, setExpanded]: any = useState(false);

  const reactFlowInstance = useReactFlow()

  const {projectName} = data

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleNewOutputClick = (reactFlowInstance: any) => {

    const nodeX = xPos + 200;
    const nodeY = yPos;

    console.log(xPos, yPos)

    const newNodeId: string = createNode({nodeX, nodeY, inPixels: false, reactFlowInstance, projectName})
    createEdge({source: id, target: newNodeId, reactFlowInstance, projectName})
  }

  const handleNewInputClick = (reactFlowInstance: any) => {

    const nodeX = xPos - 200;
    const nodeY = yPos;

    console.log(xPos, yPos)

    const newNodeId: string = createNode({nodeX, nodeY, inPixels: false, reactFlowInstance, projectName})
    createEdge({source: newNodeId, target: id, reactFlowInstance, projectName})
  }



  var expandedTest = <></>
  var expandIcon = <ExpandMoreOutlinedIcon/>

  if( expanded){
    expandedTest =  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { 
          margin: '2px',
          marginBottom: '4px', },
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
    expandIcon = <ExpandLessOutlinedIcon />
  }

  return (
    
    <Box 
      sx={{
        padding: '3px',
        paddingTop: '0px',
        paddingBottom: '0px',
        textAlign: 'center',
      }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '0px',
          paddingTop: '0px',
        }}>
        <IconButton 
          onClick={() => handleNewInputClick(reactFlowInstance)}
          sx={{
            padding: 0,
          }}
        ><AddBoxOutlinedIcon/></IconButton>
        <Input 
          defaultValue="New Node" 
          disableUnderline={true}
          fullWidth
          sx = {{
            marginTop: '2px',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        />
        <IconButton 
          onClick={() => handleNewOutputClick(reactFlowInstance)}
          size = "small"
          sx={{
            padding: 0,
          }}
        ><AddCircleOutlineOutlinedIcon/></IconButton>
      </Box>
      <IconButton
        onClick={handleExpandClick}
        sx = {{
          padding: 0,
          margin: '-5px',
          marginTop: '-15px',
        }}
        >
            {expandIcon}
        </IconButton>
        {expandedTest}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{background: '#555' }}
        isConnectable={isConnectable}
      />
    </Box>
  );
};

export default memo(SpecialNode)