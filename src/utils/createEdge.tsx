import { MarkerType } from "react-flow-renderer";

function createEdge ({source, target, reactFlowInstance}: any): string {


    const id = 'e' + source.toString() + '-' + target.toString();
    const newEdge = {
        id,
        type: 'smoothstep',
        source,
        target,
        animated: true,
        label: '',
        markerEnd: {
            type: MarkerType.Arrow,
          },
    }

    reactFlowInstance.addEdges(newEdge)
    return (id)

}


export default createEdge;