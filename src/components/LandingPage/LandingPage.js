import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import AllPost from '../AllPost/AllPost';

import './LandingPage.scss';

class LandingPage extends React.Component {
  render() {
    const {
      allPost,
      users,
      itemsName,
    } = this.props;

    const newPostLink = '/newPost';
    const allPostLink = '/posts';

    return (
      <div className="LandingPage">
        <Jumbotron>
          <h4 className="display-3">Welcome to A Helping Hand!</h4>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within
            the larger container.</p>
          <div>
            <div>
              <Link className="btn btn-primary m-2" to={allPostLink}>I want to Help</Link>
            </div>
            <div>
              <Link className="btn btn-primary m-2" to={newPostLink}>I Need Help</Link>
            </div>
          </div>
        </Jumbotron>
        <AllPost
          allPost={allPost}
          users={users}
          itemsName={itemsName} />
      </div>
    );
  }
}

export default LandingPage;
