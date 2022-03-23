function createNode ({nodeX, nodeY, inPixels, reactFlowInstance}: any): string {

    const currentNodes = reactFlowInstance.getNodes()
    const id = currentNodes.length + 1
    reactFlowInstance.getNodes()
    var position = {x:0,y:0}
    if(inPixels){
        position = reactFlowInstance.project({
        x: nodeX, 
        y: nodeY,
       });
    }
    else{
        position ={
            x: nodeX, 
            y: nodeY,
           };
    }


    const newNode = {
    id: id.toString(),
    type: 'special',
    data: { label: `Node ${id}`},
    position,
    }

    reactFlowInstance.addNodes(newNode);
    return (id.toString())
}


export default createNode;