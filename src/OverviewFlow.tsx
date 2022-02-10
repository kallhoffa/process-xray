import React, { useState, useRef } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './initial-elements';
import CanvasClickPopover from './CanvasClickPopover';

import SpecialNode from './SpecialNode'


const nodeTypes = {
  special: SpecialNode,
}


const OverviewFlow = () => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const onLoad = (reactFlowInstance: any) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
    setReactFlowInstance(reactFlowInstance);
  };

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

  const [elements, setElements]: any = useState(initialElements);
  const [lastElementId, setLastElementId]: any = useState(7);

  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

  

  return (
    <div className="ReactFlowWrapper" ref={reactFlowWrapper}>
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
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
      <CanvasClickPopover handleClose={handleCanvasPopoverClose} anchorEl={anchorEl} setElements={setElements} 
                          elements={elements} lastElementId={lastElementId} setLastElementId={setLastElementId}
                          reactFlowInstance={reactFlowInstance} reactFlowWrapper={reactFlowWrapper}/>
      
    </ReactFlow>
    </div>
  );
};

export default OverviewFlow;