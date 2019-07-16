import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from '../helpers/data/connections';
import Auth from '../components/Auth/Auth';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import Home from '../components/Home/Home';

import './App.scss';

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.reomveListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.reomveListener();
  }

  render() {
    const loadComponent = () => {
      if (authed) {
        return <Home />;
      }
      return < Auth />;
    };
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavBar authed={authed} />
        {loadComponent()}
      </div>
    );
  }
}

export default App;
