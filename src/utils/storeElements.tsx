import { setDoc, doc } from "firebase/firestore"; 
import { db } from "../firebase";

async function storeElements (projectName: string, nodes: any, edges: any){
    try {
        await setDoc(doc(db, "projects", projectName), {
          nodes,
          edges
        }, );
      
        console.log("Document written with ID: projects - ", projectName);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export default storeElements