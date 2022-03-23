const updateNode = ({id, data, reactFlowInstance}: any) => {
    
    const newNodes = reactFlowInstance.getNodes().map((node: { id: any; data: any }) => {
        if (node.id === id) {
            return { ...node, data: { ...node.data, ...data } }
        }
        return node
    })
    reactFlowInstance.setNodes(newNodes)
    return newNodes

}

export default updateNode;