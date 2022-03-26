import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


async function readElements (projectId: string){
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return( docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      return({nodes:[], edges:[]})
    }
}

export default readElements