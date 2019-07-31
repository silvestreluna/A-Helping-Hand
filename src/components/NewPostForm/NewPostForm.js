import React from 'react';
import {
  Button,
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

    getData.addNewPost(newPostObj, newPostId)
      .then(() => this.setState({ newPostId }))
      .catch(err => console.error(err, 'Nothing to Add.'));
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
        <h3>New Form</h3>
        <div>
          <Form>
            {
              (newPostId)
                ? (<h5>{story}</h5>)
                : (
                  <FormGroup>
                    <Label for="story">Your Story</Label>
                    <Input type="textarea" name="text" id="story" value={story} onChange={this.userStory} required />
                  </FormGroup>
                )
            }
            {/* <ListItems /> */}
            {
              (newPostId) ? (
                <FormGroup>
                  <ListItems filteredItem={filteredItem} />
                  <Label for="item1"></Label>
                  <Input type="text" name="text" id="item1" placeholder="Item I need.." value={item1} onChange={this.userItem1} />
                  <Button className="btn btn-primary m-2" onClick={this.postNewProdAndItem}>+ More Item</Button>
                </FormGroup>
              ) : (
                ''
              )
            }

            {
              (newPostId) ? (
                <input type="submit" value="Submit" className="btn btn-secondary m-5" onClick={this.completePost} />
              ) : (
                  <input type="submit" value="Next" className="btn btn-secondary m-5" onClick={this.putApost} />
              )
            }
          </Form>
        </div>
      </div>
    );
  }
}

export default NewPostForm;
