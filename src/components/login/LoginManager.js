import firebaseConfig from './firebase.config';
import firebase from "firebase";
import 'firebase/auth';

export const initializeLoginFrameWork = () => {
    
    if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}




export const handleGoogleSignIN = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
    .then(response => {
      const {displayName, photoURL, email} = response.user;
      const signInUser = {
        isSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      return signInUser;
    })

    .catch( err => {
      console.log(err);
    })
  }

export const handleFbSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
    .then( result => {
      const token = result.credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch( error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }


export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn : false
      }
      return signOutUser
    })

    .catch(err => {

    })
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

  
// export const crearUserWithEmaiAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         updateUserName(user.name);
//         console.log('sign in user', res.user)
//       })
//       .catch( error  => {
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo)
//       });
// } 

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//       console.log('sign in user info' , res.user)
//     })
//     .catch(function(error) {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo)
//     });
// }




