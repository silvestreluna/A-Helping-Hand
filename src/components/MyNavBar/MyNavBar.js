import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Nav,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import Auth from '../Auth/Auth';
import 'firebase/auth';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <div className="MyNavBar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <span className="navbar-brand">A Helping <i className="fas fa-hands"></i></span>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul className="navbar-nav ml-auto nav-right">
              <Nav className="d-flex justify-content-around m-2">
                <NavLink tag={RRNavLink} to='/home'><i className="fas fa-home"></i> Home</NavLink>
                <NavLink tag={RRNavLink} to='/posts'><i className="far fa-list-alt"></i> All Posts</NavLink>
                <NavLink tag={RRNavLink} to='/user'><i className="fas fa-user"></i> My Space</NavLink>
              </Nav>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              { authed ? (
              <button className="btn btn-outline my-2 my-sm-0 log-out-btn" onClick={this.logMeOut}><i className="fas fa-sign-out-alt"></i> Logout</button>
              ) : (
                <Auth />
              )}
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavBar;
