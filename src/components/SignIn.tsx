import { Box, Button, Dialog } from '@material-ui/core';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase.js'

const SignIn = () => {

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
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
          handleClose();
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }, []);
    
    
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
      const handleSignOut = () => {
        firebase.auth().signOut()
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
        <>
        <div>{signInBlock}</div>
        <Dialog   
          open={open}
          onClose={handleClose}
        >
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> 
        </Dialog>
        </>
    )
}

export default SignIn;