import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import getData from '../../helpers/data/getAllPost';
import smashProd from '../../helpers/data/smashData';
import DonorPageUser from '../DonorPageUser/DonorPageUser';

import './DonateItems.scss';


class DonateItems extends React.Component {
  state = {
    postObj: '',
    items: [],
    prodName: [],
    client: [],
    isDonating: false,
  }

  getAllPostData = () => {
    const postId = this.props.match.params.id;

    getData.getDonorSelectedItem(postId, 'post')
      .then((res) => {
        this.setState({ postObj: res.data.uid });
      }).then(() => {
        const test = this.state.postObj;
        getData.getUser(test)
          .then(res2 => this.setState({ client: res2.data }));
      })
      .catch(err => console.error(err, 'Nothing came back. test'));

    smashProd.itemsName()
      .then((res) => {
        const filteredDateById = res.filter(item => item.postId === postId);
        this.setState({ prodName: filteredDateById });
      })
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  addToHelperCounter = () => {
    const { uid } = firebase.auth().currentUser;
    const postId = this.props.match.params.id;

    const helperObj = {
      donorUid: uid,
      postId,
    };
    getData.addHelper(helperObj)
      .catch(err => console.error(err, 'Nothing updated'));
  }

  donorCxl = (e) => {
    e.preventDefault();
    this.props.history.push('/posts');
  }

  donorAccepted = () => {
    const postId = this.props.match.params.id;
    const updatedPost = {
      isPosted: false,
    };
    getData.editPost(updatedPost, postId)
      .then(() => {
        this.setState({ isDonating: true });
        this.addToHelperCounter();
      })
      .catch(err => console.error(err, 'Nothing updated'));
  }

  goBackToPostPage = () => {
    this.props.history.push('/posts');
  };

  componentDidMount() {
    this.getAllPostData();
  }

  render() {
    const { client, prodName, isDonating } = this.state;
    const clientInfo = Object.values(client).map(a => (
      <DonorPageUser key={a.uid}
        name={`${a.fName} ${a.lName}`}
        email={a.email}
        phNum={a.phNum}
        isDonating={isDonating} />
    ));
    const listOfItem = prodName.map((item) => {
      if (item.prodName !== '') {
        return <li key={item.prodId}>{item.prodName}</li>;
      }
      return '';
    });
    return (
      <div className="DonateItems">
        <div className="client-note">
          {clientInfo}
        </div>
        <div className="items-list">
          <ul>
            {listOfItem}
          </ul>
        </div>
        {
          (isDonating)
            ? (
              <div>
                <button className="btn btn-success" onClick={this.goBackToPostPage}>Done</button>
              </div>
            )
            : (
              <div className="m-3">
                <p>Do you agree to donate all of the above items?</p>
                <button className="btn btn-primary m-2" onClick={this.donorAccepted}>YES</button>
                <button className="btn btn-danger m-2" onClick={this.donorCxl}>NO</button>
              </div>
            )
        }
      </div>
    );
  }
}

export default DonateItems;
