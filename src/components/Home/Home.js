import React from 'react';
import allPostData from '../../helpers/data/getAllPost';
import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';

import LandingPage from '../LandingPage/LandingPage';

class Home extends React.Component {
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
      <div className="Home">
        <div className="links">
        </div>
        <LandingPage
        allPost={allPost}
        itemsName={itemsName}
        users={users}/>
      </div>
    );
  }
}

export default Home;
