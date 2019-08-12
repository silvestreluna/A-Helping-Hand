import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import util from '../../helpers/util';
import getData from '../../helpers/data/getAllPost';
import ListItems from '../ListItems/ListItems';
import prodName from '../../helpers/data/smashData';
import './NewPostForm.scss';


class NewPostForm extends React.Component {
  state = {
    // newPost: defaultPost,
    story: '',
    item1: '',
    newPostId: '',
    smashItemName: [],

  }

  getItemData = () => {
    prodName.itemsName()
      .then(data => this.setState({ smashItemName: data }))
      .catch(err => console.error(err, 'Nothing came back'));
  };

  componentDidMount() {
    this.getItemData();
  }


  userStory = (e) => {
    e.preventDefault();
    this.setState({ story: e.target.value });
  }

  userItem1 = (e) => {
    e.preventDefault();
    this.setState({ item1: e.target.value });
  }

  putApost = (e) => {
    e.preventDefault();
    const newPostId = firebase.database().ref().child('/post').push().key;
    const { uid } = firebase.auth().currentUser;

    const newPostObj = {
      isPosted: true,
      uid,
      postDate: util.addDateAndTime(),
      postDesc: this.state.story,
    };
    if (this.state.story !== '') {
      getData.addNewPost(newPostObj, newPostId)
        .then(() => this.setState({ newPostId }))
        .catch(err => console.error(err, 'Nothing to Add.'));
    }
  }


  postNewProdAndItem = (e) => {
    e.preventDefault();
    const newProdId = firebase.database().ref().child('/products').push().key;

    const newProdObj = {
      prodId: newProdId,
      prodName: this.state.item1,
      url: '',
    };

    const newItem1 = {
      postId: this.state.newPostId,
      productId: newProdId,
    };

    if (this.state.item1 === '') {
      this.setState({ item1: '' });
    } else {
      getData.addNewProd(newProdObj, newProdId)
        .then(() => {
          getData.addNewItem(newItem1)
            .then(() => {
              this.setState({ item1: '' });
              this.getItemData();
            });
        })
        .catch(err => console.error(err, 'Not able to Add items'));
    }
  };

  completePost = (e) => {
    e.preventDefault();
    this.setState({ story: '' });
    this.props.history.push('/posts');
  }


  render() {
    const {
      story,
      item1,
      newPostId,
      smashItemName,
    } = this.state;
    const filteredItem = smashItemName.filter(a => a.postId === newPostId);

    return (
      <div className="NewPostForm">
        <Form>
          {
            (newPostId)
              ? (
                <div className="story-display">
                  <p>{story}</p>
                </div>
              )
              : (
                <div className="story-form">
                  <FormGroup>
                    <Label for="story">Your Story</Label>
                    <Input type="textarea" name="text" id="story" value={story} onChange={this.userStory}/>
                  </FormGroup>
                </div>
              )
          }
          {/* <ListItems /> */}
          {
            (newPostId) ? (
              <FormGroup>
                <div className="wanted-items">
                  <ListItems filteredItem={filteredItem} />
                </div>
                <div className="item-container">
                  <Label for="items"></Label>
                  <Input type="text" name="text" id="items" placeholder="Item I need.." value={item1} onChange={this.userItem1} />
                </div>
                <i className="fas fa-plus" onClick={this.postNewProdAndItem}></i>
              </FormGroup>
            ) : (
              ''
            )
          }

          {
            (newPostId) ? (
              <input type="submit" value="Create" className="btn btn-primary create-post" onClick={this.completePost} />
            ) : (
                <input type="submit" value="Next" className="btn btn-primary" onClick={this.putApost} />
            )
          }
        </Form>
      </div>
    );
  }
}

export default NewPostForm;
