import React, { memo , FC, useState} from 'react';

import './SpecialNode.css'

import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
import { Box, Input, IconButton, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

// const handleNodeClick = (event: any) => {
//   console.log("click")
// };

import createNode from '../utils/createNode'
import createEdge from '../utils/createEdge'
import deleteNode from '../utils/deleteNode';
import updateNode from '../utils/updateNode';

const SpecialNode : FC<NodeProps> = ({ data, selected, id, xPos, yPos, isConnectable}: any) => {
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

  const handleDeleteClick = ({id, reactFlowInstance}: any) => {
    deleteNode({id, reactFlowInstance})
  }

  const handleNameUpdate = (event: any) => {
    const newName = event.target.value
    updateNode({id, data: {...data, name: newName}, reactFlowInstance})
  }

  const handleDescriptionUpdate = (event: any) => {
    const newDescription = event.target.value
    updateNode({id, data: {...data, description: newDescription}, reactFlowInstance})
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
          defaultValue={data.description}
          onChange={(event: any) => {
            handleDescriptionUpdate(event)
          }}
          onTouchEnd={(event: any) => {
            event.target.focus()
          }}
          sx={{
            '& .MuiInputLabel-root': {fontSize: '10px'},
            '& .MuiInputBase-root': {fontSize: '10px'},
          }}
          multiline
        />
        </div>
        <IconButton
          size='small'
          color='error'
          onClick={() => handleDeleteClick({id, reactFlowInstance})}
          onTouchEnd={() => handleDeleteClick({id, reactFlowInstance})}
          >
          <DeleteIcon />
        </IconButton>
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
        cursor: 'pointer',
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
          onTouchEnd={() => handleNewInputClick(reactFlowInstance)}
          disabled={!selected}
          sx={{
            padding: 0,
            visibility: selected ? 'visible' : 'hidden',
          }}
        ><AddBoxOutlinedIcon/></IconButton>
        <Input 
          defaultValue={data.name}
          disableUnderline={true}
          onChange={(event: any) => {
            handleNameUpdate(event)
          }}
          onTouchEnd={(event: any) => {
            event.target.focus()
          }}
          fullWidth
          sx = {{
            marginTop: '2px',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        />
        <IconButton 
          onClick={() => handleNewOutputClick(reactFlowInstance)}
          onTouchEnd={() => handleNewOutputClick(reactFlowInstance)}
          disabled={!selected}
          size = "small"
          sx={{
            padding: 0,
            visibility: selected ? 'visible' : 'hidden',
          }}
        ><AddCircleOutlineOutlinedIcon/></IconButton>
      </Box>
      <IconButton
        onClick={handleExpandClick}
        onTouchEnd={handleExpandClick}
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