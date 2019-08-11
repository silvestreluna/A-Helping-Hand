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
        <div className="container-fluid">
        <Jumbotron>
          <h4 className="display-4">Welcome to A Helping Hand!</h4>
          <p className="lead">This page makes it easy for people to ask for help and for people help others in the community.</p>
          <hr className="my-2" />
          <p>Everybody needs a helping hand, please view all of the post needing help or if you need help, please create a new post.</p>
            <div className="jumbo-links-wrappers">
              <Link className="btn btn-primary m-2 help" to={allPostLink}>Help</Link>
              <Link className="btn btn-primary m-2 need" to={newPostLink}>Need</Link>
            </div>
        </Jumbotron>
        </div>
        <AllPost
          allPost={allPost}
          users={users}
          itemsName={itemsName} />
      </div>
    );
  }
}

export default LandingPage;
