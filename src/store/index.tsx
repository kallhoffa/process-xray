import { Node, Edge } from 'react-flow-renderer';
import {atom} from 'recoil'
import firebase from '../firebase.js'

export const userState = atom({
    key: 'userState', 
    default: firebase.auth().currentUser ,
  });

export const activeProjectState = atom({
    key: 'activeProjectState',
    default: {
        id: '',
        name: '',
        new: false,
    }
})

export const desiredProjectNameState = atom({
key: 'desiredProjectNameState', 
default: '',
});

export const loadedProjectNameState = atom({
key: 'loadedProjectNameState', 
default: '',
});

export const projectListState = atom<any[]>({
key: 'projectListState', 
default: [],
});

export const nodesState = atom({
key: 'nodesState', 
default: [] as Node[],
});

export const edgesState = atom({
key: 'edgesState', 
default: [] as Edge[],
});
