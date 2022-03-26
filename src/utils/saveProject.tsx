import { collection, setDoc, doc, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import firebase from '../firebase.js'
import {Node, Edge} from 'react-flow-renderer'

async function saveProject (projectId: string, projectName: string, nodes: Node[], edges: Edge[]){

  const userUID  = firebase.auth().currentUser!.uid

  if(projectId){ 
    try {
    await setDoc(doc(db, "projects", projectId), {
      name: projectName,
      nodes,
      edges
    }, {merge: true});
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    console.log("Document written with ID: projects/", projectId);
    return projectId
  } else {
    try{
      const docRef = await addDoc(collection(db, "projects"), {
        name: projectName,
        owners: [userUID],
        editors: [],
        viewers: [],
        nodes, 
        edges
      });
      
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}

export default saveProject