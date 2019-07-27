import React from 'react';

class DonorPageUser extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="DonorPageUser">
        <p>You are Helping: {name}</p>
      </div>
    );
  }
}

export default DonorPageUser;
