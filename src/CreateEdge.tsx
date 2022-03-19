
function CreateEdge ({source, target, elementsObject}: any): string {


    const id = 'e' + source.toString() + '-' + target.toString();
    const newEdge = {
        id,
        type: 'smoothstep',
        source,
        target,
        animated: true,
        label: '',
        arrowHeadType: 'arrowclosed',
    }

    console.log(newEdge)

    elementsObject.updateElements(elementsObject.elementRef.current.concat(newEdge));
    console.log(elementsObject.elementRef.current)
    return (id)

}


export default CreateEdge;