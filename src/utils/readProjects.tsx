import {  getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import firebase from '../firebase.js'


async function readProjects (){
    
    const projRef = collection(db, "projects");

    const userUID  = firebase.auth().currentUser ? firebase.auth().currentUser!.uid : 'guest'
    const projOwnerQuery = query(projRef, where("owners", "array-contains", userUID));
    const projEditorQuery = query(projRef, where('editors', 'array-contains', userUID));
    const projViewerQuery = query(projRef, where('viewers', 'array-contains', userUID));   

    console.log(userUID)
    
    const projectList: any = []

    const [projOwnerList, projEditorList, projViewerList] = await Promise.all([getDocs(projOwnerQuery), getDocs(projEditorQuery), getDocs(projViewerQuery)]);
    
    const userProjects = [...projOwnerList.docs, ...projEditorList.docs, ...projViewerList.docs];

    userProjects.forEach((project: any) => {
        projectList.push({name: project.data().name, id: project.id})
    })

    console.log(projectList)
    return projectList;

}

export default readProjects