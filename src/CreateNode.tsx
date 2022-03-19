
function CreateNode ({nodeX, nodeY, inPixels, elementsObject}: any): string {


    const id = elementsObject.lastElementId.current + 1
    var position = {x:0,y:0}
    if(inPixels){
        position = elementsObject.reactFlowInstance.project({
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

    console.log(position)

    const newNode = {
    id: id.toString(),
    type: 'special',
    data: { label: `Node ${id}`, elementsObject },
    position,
    }

    console.log(newNode)

    elementsObject.updateElements(elementsObject.elementRef.current.concat(newNode));
    elementsObject.lastElementId.current = id
    return (id.toString())
}


export default CreateNode;