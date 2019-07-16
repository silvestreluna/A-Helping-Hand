import React from 'react';
import firebaseApp from '../helpers/data/connections';
import Auth from '../components/Auth/Auth';
import MyNavBar from '../components/MyNavBar/MyNavBar';

import './App.scss';

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    return (
      <div className="App">
        <MyNavBar authed={this.state.authed} />
        <h1>Hello App!!</h1>
        <Auth />
      </div>
    );
  }
}

export default App;
