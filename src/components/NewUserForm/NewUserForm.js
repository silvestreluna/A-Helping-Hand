import React from 'react';


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
        <h3>New User</h3>
        <div className="col-12 vh-100 d-flex align-items-center px-0">
          <div className="container">
            <div className="card">
              <div className="m-5">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <div className="card-body text-center mx-5">
                      <h5 className="lead font-weight-bold mb-5 text-center">Create Profile</h5>
                      <form onSubmit={this.createUser}>
                        <input type="text" className="form-control mb-4" placeholder="First Name" value={fName} onChange={this.fNameChangeHandler}/>
                        <input type="text" className="form-control mb-4" placeholder="Last Name" value={lName} onChange={this.lNameChangeHandler} />
                        <input type="text" className="form-control mb-4" placeholder="City" value={loc} onChange={this.cityChangeHandler}/>
                        <input type="text" className="form-control mb-4" placeholder="Phone Number" value={phNum} onChange={this.phNumChangeHandler}/>
                        <div>
                          <button type="submit" className="btn btn-primary px-3 mr-3">Create</button>
                          {/* <Link to="/home" className="btn btn-dark px-3"><i className="fas fa-address-card pr-1"></i> Back to Home</Link> */}
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
