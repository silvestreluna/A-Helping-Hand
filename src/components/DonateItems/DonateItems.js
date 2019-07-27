import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import getData from '../../helpers/data/getAllPost';
import smashProd from '../../helpers/data/smashData';
import DonorPageUser from '../DonorPageUser/DonorPageUser';


class DonateItems extends React.Component {
  state = {
    postObj: {},
    items: [],
    prodName: [],
    client: [],
  }

  getAllPostData = () => {
    const postId = this.props.match.params.id;
    const currentUserUid = firebase.auth().currentUser.uid;
    // const postPath = 'post';
    // const itemPath = 'items';
    // const userPath = 'XKs7nATTXkXjAncQucTHFxQwzyq2';


    getData.getDonorSelectedItem(postId)
      .then(res => this.setState({ postObj: res.data }))
      .catch(err => console.error(err, 'Nothing came back.'));

    smashProd.itemsName()
      .then((res) => {
        const filteredDateById = res.filter(item => item.postId === postId);
        this.setState({ prodName: filteredDateById });
      })
      .catch(err => console.error(err, 'Nothing came back.'));

    getData.getUser(currentUserUid)
      .then(res => this.setState({ client: res.data }))
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  donorCxl = (e) => {
    e.preventDefault();
    this.props.history.push('/posts');
  }

  componentDidMount() {
    this.getAllPostData();
  }

  render() {
    const { client, prodName } = this.state;
    const test2 = Object.values(client).map(a => (
       <DonorPageUser key={a.id}
       name={`${a.fName} ${a.lName}`}/>
    ));
    console.error(prodName, 'filterName');
    const listOfItem = prodName.map((item) => {
      if (item.prodName !== '') {
        return <li key={item.prodId}>{item.prodName}</li>;
      }
      return '';
    });
    return (
      <div className="DonateItems">
        <h1>DonateItems</h1>
        {test2}
        <ul>
        {listOfItem}
        <div className="m-3">
          <p>Do you agree to donate all of the above items?</p>
          <button className="btn btn-primary m-2">YES</button>
          <button className="btn btn-danger m-2" onClick={this.donorCxl}>NO</button>
        </div>
        </ul>
      </div>
    );
  }
}

export default DonateItems;
