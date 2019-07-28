import React from 'react';


class HelpedCounter extends React.Component {
  render() {
    const { helpedCount } = this.props;
    return (
      <div className="HelpedCounter">
        <div className="alert alert-info" role="alert">
          <p>You have helped {helpedCount} people! Thank you for making a difference!</p>
        </div>
      </div>
    );
  }
}

export default HelpedCounter;
