import React, { useState } from 'react';




// import * as firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';
import { Button, Input, makeStyles, TextField } from '@material-ui/core';
import firebaseConfig from './firebase.config';
import firebase from "firebase";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
// import firebase from '@firebase/app';



firebase.initializeApp(firebaseConfig);


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function Login() {

  const classes = useStyles();

 

  const [newUser, setNewUser] = useState(false);


  const [user, setUser] = useState({
    isSignIn : false,
    name : '',
    email : '',
    password : '',
    photo : '',
    error : '',
    success : false
  })

 

  // const provider = new firebase.auth.GoogleAuthProvider();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
 


  var googleProvider = new firebase.auth.GoogleAuthProvider();


  const facebookProvider = new firebase.auth.FacebookAuthProvider();


  const handleSignIn = () => {

    firebase.auth().signInWithPopup(googleProvider)
    .then(response => {
      const {displayName, photoURL, email} = response.user;
      const signInUser = {
        isSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signInUser);
    })

    .catch( err => {
      console.log(err);
    })
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn : false
      }
      setUser(signOutUser)
    })

    .catch(err => {

    })
  }

  const handleCreateAccount = (e) => {

    if( newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
        console.log('sign in user', res.user)
      })
      .catch( error  => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
      });
    }
    // if (!newUser && user.email && user.password) {
    //   firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    //   .catch( error => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
    // }
    e.preventDefault();
  }

  const handlePasswordSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
      console.log('sign in user info' , res.user)
    })
    .catch(function(error) {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo)
    });
  }

  const handleBlur = (e) => {

    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile( {
      displayName: name
    })
    .then(function() {
      console.log('Update successful.');
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)

    .then( result => {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log( 'fb-user after sign in', user)
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  return (
    <div className="App">

      { 
        user.isSignIn === false ?
          <Button style={{marginTop:'30px'}} onClick={() => handleSignIn()} variant="outlined" color="primary">
            Sign In With Google
          </Button>
        : <Button onClick={() => handleSignOut()}variant="outlined" color="secondary">
            Sign Out
          </Button>
      }
      <br/>
      { 
          <Button style={{marginTop:'30px'}} onClick={() => handleFbSignIn()} variant="outlined" color="primary">
            Sign In With Facebook
          </Button>
      }

      {
        user.isSignIn &&
          <div>
            <img src={user.photo} alt=""/>
            <p>Welcome, {user.name} </p>
            <p>Your email : {user.email} </p>
          </div>
      }


    <h1>Our Own Authentication system</h1> 
    

    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id=""/>
    <label htmlFor="newUser" >New User</label>
    <form onSubmit={() => handleCreateAccount()} className={classes.root} noValidate autoComplete="off">        
      { 
        newUser && 
         <TextField onBlur={handleBlur} name='name' id="outlined-basic" label="Name" variant="outlined" required/>
      }
      <br/>
      <TextField name='email' onBlur={handleBlur} id="outlined-basic" label="E-mail" variant="outlined" required/>
      <br/>
      <TextField name='password' id="outlined-basic" label="password" variant="outlined" type="password" required onBlur={handleBlur} />
      <br/>

      { newUser && 
        <Button  onClick={handleCreateAccount} variant="outlined" color="primary">
          Creat An Account
        </Button>
      }

      { newUser === false && 
        <Button  onClick={handlePasswordSignIn} variant="outlined" color="primary">
          Sign In
        </Button>
      }
      
    </form>
    <p style={{color: "red"}} > {user.error} </p>
    {
      user.success && <p style={{color: "green"}} > User { newUser ? 'Created' : 'Logged In'} Successfully </p>
    }

    </div>
  );
}

export default Login;
