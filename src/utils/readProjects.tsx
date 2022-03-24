import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


async function readProjects (){

    const projectList: any = []
    const querySnapshot = await getDocs(collection(db, "projects"));
    
    querySnapshot.forEach((doc: any) => {
        projectList.push(doc.id);
    });

    return projectList;

}

export default readProjects