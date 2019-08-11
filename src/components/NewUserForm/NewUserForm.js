import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import allData from '../../helpers/data/getAllPost';
import './NewUserForm.scss';


class NewUser extends React.Component {
  state = {
    fName: '',
    lName: '',
    loc: '',
    phNum: '',
  }

  fNameChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ fName: e.target.value });
  }

  lNameChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ lName: e.target.value });
  }

  cityChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ loc: e.target.value });
  }

  phNumChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ phNum: e.target.value });
  }

  createUser = (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    const { email } = firebase.auth().currentUser;

    const newUserObj = {
      uid,
      fName: this.state.fName,
      lName: this.state.lName,
      loc: this.state.loc,
      phNum: this.state.phNum,
      email,
    };
    allData.addNewUser(newUserObj)
      .then(() => {
        this.props.reloadUser();
      })
      .catch(err => console.error(err, 'Nothing was posted'));
  };

  render() {
    const {
      fName,
      lName,
      loc,
      phNum,
    } = this.state;
    return (
      <div className="NewUser">
        <div className="col-12 vh-100 d-flex align-items-center px-0">
          <div className="container">
            <div className="card">
              <div className="m-5">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <div className="card-body text-center mx-5">
                      <div className="alert alert-primary" role="alert">
                        <p>Need a little more information from you. Please provide the following information.</p>
                      </div>
                      <form onSubmit={this.createUser}>
                        <input type="text" className="form-control mb-4" placeholder="First Name" value={fName} onChange={this.fNameChangeHandler} />
                        <input type="text" className="form-control mb-4" placeholder="Last Name" value={lName} onChange={this.lNameChangeHandler} />
                        <input type="text" className="form-control mb-4" placeholder="City and State" value={loc} onChange={this.cityChangeHandler} />
                        <input type="number" className="form-control mb-4" placeholder="Phone Number" value={phNum} onChange={this.phNumChangeHandler} />
                        <div>
                          <button type="submit" className="btn btn-primary px-3 mr-3">Create</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;
