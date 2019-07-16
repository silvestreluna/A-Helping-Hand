import React from 'react';
import firebaseApp from '../helpers/data/connections';
import Auth from '../components/Auth/Auth';

import './App.scss';

firebaseApp();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello App!!</h1>
        <button className="btn btn-danger"> Hello</button>
        <Auth />
      </div>
    );
  }
}

export default App;
