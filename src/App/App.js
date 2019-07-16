import React from 'react';
import {
  Route,
  Redirect,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from '../helpers/data/connections';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import Home from '../components/Home/Home';

import './App.scss';

firebaseApp();
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props}/>)
    : (
      (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
    )
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = props => (authed === true
//     ? (<Component {...props}/>)
//     : (
//       (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
//     )
//   );
//   return <Route {...rest} render={props => routeChecker(props)}/>;
// };

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
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
        <React.Fragment>
          <MyNavBar authed={authed} />
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute path='/auth' component={Home} authed={authed}/>
                <Redirect from="*" to='/home' />
              </Switch>
            </div>
          </div>
        </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
