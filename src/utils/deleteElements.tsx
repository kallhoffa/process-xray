import {doc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase";

async function deleteElements(projectName: any){

    await deleteDoc(doc(db, "projects", projectName))

    return true
}

export default deleteElements