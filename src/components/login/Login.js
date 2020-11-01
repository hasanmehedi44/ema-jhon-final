import React, { useState } from 'react';




import { Button, Input, makeStyles, TextField } from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { creatUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIN, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManager';


initializeLoginFrameWork();


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

 


  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
 

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect) {
      history.replace(from);
    }
  }

  const handleCreateAccount = (e) => {

    if( newUser && user.email && user.password) {
      creatUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  const handlePasswordSignIn = () => {
    signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      handleResponse(res, true)
    })
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

  const googleSignIn = () => {
    handleGoogleSignIN()
    .then( res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then( res => {
      handleResponse(res, false)
    })
  }

  const facebookSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }



  return (
    <div className="App">

      { 
        user.isSignIn === false ?
          <Button style={{marginTop:'30px'}} onClick={() => googleSignIn()} variant="outlined" color="primary">
            Sign In With Google
          </Button>
        : <Button onClick={() => signOut()}variant="outlined" color="secondary">
            Sign Out
          </Button>
      }
      <br/>
      { 
          <Button style={{marginTop:'30px'}} onClick={() => facebookSignIn()} variant="outlined" color="primary">
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
