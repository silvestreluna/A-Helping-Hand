import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import allPostData from '../../helpers/data/getAllPost';
import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';
import LandingPage from '../LandingPage/LandingPage';
import NewUserForm from '../NewUserForm/NewUserForm';


class Home extends React.Component {
  state = {
    allPost: [],
    itemsName: [],
    users: [],
    newUser: {},
  }

  getAllPostData = () => {
    allPostData.getAllPost()
      .then((allPost) => {
        const onlyThreePost = allPost.splice(0, 4);
        this.setState({ allPost: onlyThreePost });
      })
      .catch(err => console.error(err, 'Nothing came back.'));

    smash.itemsName()
      .then(itemsName => this.setState({ itemsName }))
      .catch(err => console.error(err, 'Nothing came back.'));

    allUsers.getUsers()
      .then(users => this.setState({ users }))
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  getUser = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      allPostData.getUser(uid)
        .then((res) => {
          if (Object.values(res.data)[0] !== undefined) {
            this.setState({ newUser: Object.values(res.data)[0] });
          }
        })
        .catch(err => console.error(err, 'Nothing came back'));
    }
  }

  reloadUser = () => {
    this.getUser();
  }

  componentDidMount() {
    this.getAllPostData();
    this.getUser();
  }

  render() {
    const {
      allPost,
      itemsName,
      users,
      newUser,
      // authed,
    } = this.state;
    const { authed } = this.props;
    const loadNewUserForm = Object.keys(newUser).length === 0 ? (<NewUserForm reloadUser={this.reloadUser}/>) : (<LandingPage allPost={allPost} itemsName={itemsName} users={users} />);
    return (
      <div className="Home">
        {
          (authed) ? (loadNewUserForm)
            : (
              <LandingPage
                allPost={allPost}
                itemsName={itemsName}
                users={users} />
            )
        }
      </div>
    );
  }
}

export default Home;
