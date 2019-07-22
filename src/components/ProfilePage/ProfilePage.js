import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import AllPost from '../AllPost/AllPost';
import allPostData from '../../helpers/data/getAllPost';
import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';


import './ProfilePage.scss';


class ProfilePage extends React.Component {
  state = {
    allPost: [],
    itemsName: [],
    users: [],
  }

  getAllPostData = () => {
    const { uid } = firebase.auth().currentUser;
    allPostData.getAllPost()
      .then((resp) => {
        const allPost = resp.filter(post => post.uid === uid);
        this.setState({ allPost });
      })
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

  deletePost = (postId) => {
    allPostData.deleteMyPost(postId)
      .then(() => {
        this.getAllPostData();
      })
      .catch(err => console.error(err, 'Nothing to delete'));
  }

  render() {
    const {
      allPost,
      itemsName,
      users,
    } = this.state;

    const myInfo = firebase.auth().currentUser;
    const filteredUser = users.filter(a => a.uid === myInfo.uid);
    const user = () => {
      let userValue;
      if (filteredUser.length === 0) {
        userValue = {};
      } else {
        [userValue] = filteredUser;
      }
      return userValue.loc;
    };

    return (
      <div className="ProfilePage col">
        <div className="user m-5">
          <h5>Hello, {myInfo.displayName}</h5>
          <img src={myInfo.photoURL} alt="this user Img" className="img-thumbnail userImg"/>
          <div className="border p-3">
            <p>Email: {myInfo.email}</p>
            <p>Location: {user()}</p>
          </div>
        </div>
        <div className="col">
        <AllPost
          allPost={allPost}
          myInfo={myInfo.uid}
          users={users}
          deletePost={this.deletePost}
          itemsName={itemsName}/>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
