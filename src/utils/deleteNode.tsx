function deleteNode ({id, reactFlowInstance}: any): string {

    const newNodes = reactFlowInstance.getNodes().filter((node: { id: any; }) => node.id !== id)
    reactFlowInstance.setNodes(newNodes)
    const newEdges = reactFlowInstance.getEdges().filter((edge: { source: any; target: any; }) => edge.source !== id && edge.target !== id)
    reactFlowInstance.setEdges(newEdges)

    return (newNodes)
}


export default deleteNode;