import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Box, Input, IconButton, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

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
          onClick={handleNewInputClick}
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
          onClick={handleNewOutputClick}
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