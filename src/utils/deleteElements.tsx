import {doc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase";

async function deleteElements(project: any){

    await deleteDoc(doc(db, "projects", project.id))

    return true
}

export default deleteElements