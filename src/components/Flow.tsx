import React, { useEffect, useMemo, useRef } from 'react';
import { useCallback, useState } from 'react';
import ReactFlow, { Node, Edge, addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, Background } from 'react-flow-renderer';

import readElements from '../utils/readElements'
import readProjects from '../utils/readProjects'
import CanvasClickPopover from './CanvasClickPopover';
import ProjectBar from './ProjectBar';
import SpecialNode from './SpecialNode'

const Flow = () => {

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

  const [projectName, setProjectName] = useState('');
  const [loadedProjectName, setLoadedProjectName] = useState('');
  const [projectList, setProjectList] = useState([]);

  var initialNodes: Node[] = [];
  var initialEdges: Edge[] = [];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
    if(!loadedProjectName){
      readProjects().then( (projects) => {
        setProjectList(projects);
        setProjectName(projects[0]);
        setLoadedProjectName(projects[0]);

        readElements(projects[0]).then((elements) =>{
          setNodes(elements.nodes)
          setEdges(elements.edges)
          })
      });
   } else {
     console.log(loadedProjectName)
      readElements(loadedProjectName).then((elements) =>{
        setNodes([])
        setNodes(elements.nodes)
        setEdges([])
        setEdges(elements.edges)
        })
    }
    
  }, [loadedProjectName])



  return (
    <div className="ReactFlowWrapper" ref={reactFlowWrapper}>
    <ProjectBar 
      projectName={projectName} 
      setProjectName={setProjectName} 
      loadedProjectName={loadedProjectName} 
      setLoadedProjectName={setLoadedProjectName} 
      projectList={projectList} 
      setProjectList={setProjectList}
      nodes={nodes} 
      edges={edges}
    />
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
        
      <MiniMap
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
      />
      <Controls />
      <Background color="#aaa" gap={16} />
      <CanvasClickPopover handleClose={handleCanvasPopoverClose} anchorEl={anchorEl} reactFlowWrapper={reactFlowWrapper} projectName={projectName}/> 
    </ReactFlow>
    </div>
  );
};

export default Flow;