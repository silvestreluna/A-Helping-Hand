import React from 'react';
import { Link } from 'react-router-dom';
import AllPost from '../AllPost/AllPost';
import allPostData from '../../helpers/data/getAllPost';
import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';

import './PostPage.scss';

class PostPage extends React.Component {
  state = {
    allPost: [],
    itemsName: [],
    users: [],
  }

  getAllPostData = () => {
    allPostData.getAllPost()
      .then(allPost => this.setState({ allPost }))
      .catch(err => console.error(err, 'Nothing came back.'));

    smash.itemsName()
      .then(itemsName => this.setState({ itemsName }))
      .catch(err => console.error(err, 'Nothing came back.'));

    allUsers.getUsers()
      .then(users => this.setState({ users }))
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  componentDidMount() {
    this.getAllPostData();
  }

  // componentWillMount() {
  //   this.getAllPostData();
  // }

  render() {
    const {
      allPost,
      itemsName,
      users,
    } = this.state;
    return (
      <div className="PostPage">
        <div className="post-all">
          <h3>All Post</h3>
        </div>
        <Link className="btn btn-outline-primary mt-3" to="/newPost">I Need Help</Link>
        <AllPost
          allPost={allPost}
          itemsName={itemsName}
          users={users} />
      </div>
    );
  }
}

export default PostPage;
