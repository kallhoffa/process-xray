import {  getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import firebase from '../firebase.js'


async function readProjects (){
    const userUID  = firebase.auth().currentUser!.uid
    const projRef = collection(db, "projects");
    const projOwnerQuery = query(projRef, where("owners", "array-contains", userUID));
    const projEditorQuery = query(projRef, where('editors', 'array-contains', userUID));
    const projViewerQuery = query(projRef, where('viewers', 'array-contains', userUID));

    
    const projectList: any = []
    const [projOwnerList, projEditorList, projViewerList] = await Promise.all([getDocs(projOwnerQuery), getDocs(projEditorQuery), getDocs(projViewerQuery)]);
    
    const userProjects = [...projOwnerList.docs, ...projEditorList.docs, ...projViewerList.docs];

    userProjects.forEach((project: any) => {
        projectList.push({name: project.data().name, id: project.id})
    })

    return projectList;

}

export default readProjects