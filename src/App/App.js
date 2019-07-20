import React from 'react';
import {
  Route,
  Redirect,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';

import fbConnection from '../helpers/data/connections';
// import Auth from '../components/Auth/Auth';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import Home from '../components/Home/Home';
import postPage from '../components/PostPage/PostPage';
import ProfilePage from '../components/ProfilePage/ProfilePage';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props}/>)
    : (
      (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
    )
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props}/>)
    : (
      (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
    )
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

class App extends React.Component {
  _isMounted = false;

  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
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
                  <PublicRoute path='/auth' component={Home} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/posts' component={postPage} authed={authed} />
                  <PrivateRoute path='/user' component={ProfilePage} authed={authed} />
                  <Redirect from="*" to="/auth" />
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
