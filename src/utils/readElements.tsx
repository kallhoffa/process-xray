import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


async function readElements (projectName: string){
    const docRef = doc(db, "projects", projectName);
    const docSnap = await getDoc(docRef);
    console.log('reading')
    if (docSnap.exists()) {
        return( docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      return({nodes:[], edges:[]})
    }
}

export default readElements