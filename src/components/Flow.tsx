import firebase from '../firebase.js'
import React, { useEffect, useMemo, useRef } from 'react';
import { useCallback } from 'react';
import ReactFlow, 
  { addEdge, 
    applyEdgeChanges, 
    applyNodeChanges, 
    //MiniMap, 
    Controls, 
    Background } 
    from 'react-flow-renderer';
import { useRecoilState,  useSetRecoilState } from 'recoil';
import { activeProjectState, edgesState, nodesState, projectListState, desiredProjectNameState} from '../store';
import { Box } from '@material-ui/core';
import './Flow.css';

import readElements from '../utils/readElements'
import readProjects from '../utils/readProjects'
import CanvasClickPopover from './CanvasClickPopover';
import ProjectBar from './ProjectBar';
import SpecialNode from './SpecialNode'

const Flow = (props: any) => {

  const {user} = props

  // POPOVER Code---------------------------
  const popoverXOffset = 2;
  const popoverYoffset = 2;
  const [anchorEl, setAnchorEl] = React.useState({open: false, x: 0, y: 0});

  const handleCanvasClick = (event: any) => {
    setAnchorEl({open:true, x: event.clientX + popoverXOffset, y: event.clientY + popoverYoffset});
  };
  
  const handleCanvasPopoverClose = () => {
    setAnchorEl({open:false, x:0, y:0});
  };
  // POPOVER Code---------------------------

  const reactFlowWrapper = useRef(null);
  const [activeProject, setActiveProject] = useRecoilState(activeProjectState);
  const setDesiredProjectName = useSetRecoilState(desiredProjectNameState)
  const setProjectList= useSetRecoilState(projectListState)
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ special: SpecialNode }), []);


  
  useEffect( () => {
    if(firebase.auth().currentUser){
      if(!activeProject.name){
        readProjects().then( (projects) => {
          if(projects.length > 0){
            setProjectList(projects);
            setDesiredProjectName(projects[0].name);
            setActiveProject(projects[0]);
          }
        });
      } 
      else {
        setNodes([])
        setEdges([])
        if(!activeProject.new){
          readElements(activeProject.id).then((elements) =>{
            setNodes(elements.nodes)
            setEdges(elements.edges)
          })
        }
      }
    } 
  }, [activeProject, user, setProjectList, setDesiredProjectName, setActiveProject, setNodes, setEdges])



  return (
    <Box sx={{
        height: '100%',
        width: '100%',
        bgcolor: '#7186b8',
        display: 'grid',
        gridTemplateRows: '75px 1fr',
        position: 'relative',
      }}>
      <ProjectBar />
      <div className="ReactFlowWrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          zoomOnDoubleClick = {false}
          onPaneClick={handleCanvasClick}
          snapToGrid={true}
          snapGrid={[15, 15]}
          nodeTypes={nodeTypes}
        >
            
          {/* <MiniMap
            nodeStrokeColor={(n:any) => {
              if (n.style?.background) return n.style.background;
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'output') return '#ff0072';
              if (n.type === 'default') return '#1a192b';

              return '#eee';
            }}
            nodeColor={(n:any) => {
              if (n.style?.background) return n.style.background;

              return '#fff';
            }}
            nodeBorderRadius={2}
          /> */}
          <Controls />
          <Background color="#aaa" gap={16} />
          <CanvasClickPopover handleClose={handleCanvasPopoverClose} anchorEl={anchorEl} reactFlowWrapper={reactFlowWrapper} /> 
        </ReactFlow>
      </div>
    </Box>
  );
};

export default Flow;