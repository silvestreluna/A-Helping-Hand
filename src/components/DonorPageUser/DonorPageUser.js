import React from 'react';

class DonorPageUser extends React.Component {
  render() {
    const {
      name,
      email,
      phNum,
      isDonating,
    } = this.props;
    return (
      <div className="DonorPageUser">
        {
          (isDonating)
            ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Thank you!</h4>
          <p>Please contact {name}</p>
          <p> at {email}
          <br></br>
          or {phNum}</p>
        </div>
            ) : (
        <div>
        <p>You are Helping: {name}</p>
        </div>
            )
        }
      </div>
    );
  }
}

export default DonorPageUser;
