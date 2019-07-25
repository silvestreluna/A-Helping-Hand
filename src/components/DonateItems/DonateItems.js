import React from 'react';
import getData from '../../helpers/data/getAllPost';


class DonateItems extends React.Component {
  state = {
    postObj: {},
    user: [],
  }

  getAllPostData = () => {
    const postId = this.props.match.params.id;
    const postPath = 'post';
    const userPath = 'users';

    console.error(postId);
    getData.getDonorSelectedItem(postId, postPath)
      .then(res => this.setState({ postObj: res.data }))
      .catch(err => console.error(err, 'Nothing came back.'));

    getData.getDonorSelectedItem(postId, userPath)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  componentDidMount() {
    this.getAllPostData();
  }

  render() {
    console.error(this.state.postObj);
    return (
      <div className="DonateItems">
        <h1>DonateItems</h1>
      </div>
    );
  }
}

export default DonateItems;
