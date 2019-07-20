import React from 'react';
import AllPost from '../AllPost/AllPost';
import allPostData from '../../helpers/data/getAllPost';
import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';

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

  render() {
    const {
      allPost,
      itemsName,
      users,
    } = this.state;
    return (
      <div className="PostPage">
        <h3>Neighbors needing A Helping Hand</h3>
        <AllPost
          allPost={allPost}
          itemsName={itemsName}
          users={users}/>

      </div>
    );
  }
}

export default PostPage;
