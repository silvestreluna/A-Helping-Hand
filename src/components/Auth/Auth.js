import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginWithGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <button onClick={this.loginWithGoogle} className="btn btn-primary">Login With <i className="fab fa-google"></i></button>
      </div>
    );
  }
}

export default Auth;
