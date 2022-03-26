import { Box, Button, Dialog } from '@material-ui/core';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useSetRecoilState } from 'recoil';
import firebase from '../firebase.js'
import { activeProjectState, desiredProjectNameState, edgesState, nodesState, projectListState } from '../store';

const SignIn = (props: any) => {

    const {setUser} = props

    const setActiveProject = useSetRecoilState(activeProjectState);
    const setDesiredProjectName = useSetRecoilState(desiredProjectNameState)
    const setProjectList= useSetRecoilState(projectListState)
    const setNodes = useSetRecoilState(nodesState);
    const setEdges= useSetRecoilState(edgesState);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false,
        },
      };
    
      
      const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    
      // // Listen to the Firebase Auth state and set the local state.
      useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: any) => {
          setIsSignedIn(!!user);
          setUser(user)
          handleClose();
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }, [setUser]);
    
    
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
      const handleSignOut = () => {
        firebase.auth().signOut()
        setNodes([])
        setEdges([])
        setActiveProject({id: "", name: "", new: false})
        setDesiredProjectName("New Project")
        setProjectList([])
        setIsSignedIn(false)
      }
    
    
      var signInButton = 
        <Button variant="contained" 
          onClick={handleOpen}>
          Sign In
        </Button>
    
      var signOutButton = 
      <Button variant="contained" 
        onClick={handleSignOut}> 
        Sign Out
      </Button>
    
      var sessionButton = signInButton
      var userText = <></>
    
      if (isSignedIn) {
        sessionButton = signOutButton
        userText = <>Welcome {firebase.auth().currentUser!.displayName}</>
      }
    
      var signInBlock = 
      <Box  className='signin-button'>
      <Box sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        marginRight: '5px',
        }}>
          {userText}
        </Box>
        {sessionButton}
      <Box sx={{
        marginRight: '10px',
      }}>
        
      </Box>
    </Box>

    return (
        <Box
          sx={{
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'right',
            alignContent: 'center',
            gridColumn: '3',
            padding: '5px',
          }}>
          <div>{signInBlock}</div>
          <Dialog   
            open={open}
            onClose={handleClose}
          >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> 
          </Dialog>
        </Box>
    )
}

export default SignIn;