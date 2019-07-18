import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import AllPost from '../AllPost/AllPost';

import './LandingPage.scss';

class LandingPage extends React.Component {
  render() {
    const {
      allPost,
      users,
      itemsName,
    } = this.props;

    return (
      <div className="LandingPage">
        <Jumbotron>
          <h4 className="display-3">Welcome to A Helping Hand!</h4>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within
            the larger container.</p>
          <div>
          <p className="lead">
            <Button color="primary">I want to Help</Button>
          </p>
          <p className="lead">
          <Button color="primary">I Need Help</Button>
          </p>
          </div>
        </Jumbotron>
        <AllPost
          allPost={allPost}
          users={users}
          itemsName={itemsName}/>
      </div>
    );
  }
}

export default LandingPage;
