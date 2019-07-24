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
import getData from '../../helpers/data/getAllPost';
// import ListItems from '../ListItems/ListItems';
// import allUsers from '../../helpers/data/getUsers';
import smash from '../../helpers/data/smashData';
import EditItemForm from '../EditItemForm/EditItemForm';


class EditPost extends React.Component {
  state = {
    story: '',
    item1: '',
    postId: '',
    smashItemName: [],
    allPost: {},
    itemsName: [],
    newName: '',

  }

  getAllPostData = () => {
    const postId = this.props.match.params.id;
    getData.getDataById(postId)
      .then(res => this.setState({ allPost: res.data }))
      .catch(err => console.error(err, 'Nothing came back.'));

    smash.itemsName()
      .then(smashItemName => this.setState({ smashItemName }))
      .catch(err => console.error(err, 'Nothing came back.'));
  }

  userStory = (e) => {
    e.preventDefault();
    const copyPost = { ...this.state.allPost };
    copyPost.postDesc = e.target.value;
    this.setState({ allPost: copyPost });
  }

  userItem1 = (itemId, prodId, newName) => {
    const prodPath = 'products';
    const newObj = {
      prodName: newName,
    };

    getData.editStuff(newObj, prodId, prodPath)
      .then(() => {
        const itemPath = 'items';
        const newItemObj = {
          productId: prodId,
        };
        getData.editStuff(newItemObj, itemId, itemPath).then(
          this.getAllPostData(),
        );
      })
      .catch(err => console.error(err, 'Nothing to update'));
  }


  componentDidMount() {
    this.getAllPostData();
  }

  updatePost = (e) => {
    e.preventDefault();
    const postId = this.props.match.params.id;
    const { uid } = firebase.auth().currentUser;

    const newPostObj = {
      isPosted: true,
      uid,
      postDate: this.state.allPost.postDate,
      postDesc: this.state.allPost.postDesc,
    };

    getData.editPost(newPostObj, postId)
      .then(() => {
        this.props.history.push('/user');
      })
      .catch(err => console.error(err, 'Nothing to Add.'));
  }


  postNewProdAndItem = (e) => {
    e.preventDefault();
    const postId = this.props.match.params.id;

    const newProdId = firebase.database().ref().child('/products').push().key;
    const newProdObj = {
      prodId: newProdId,
      prodName: this.state.item1,
      url: '',
    };

    const newItem1 = {
      postId,
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
              this.getAllPostData();
            });
        })
        .catch(err => console.error(err, 'Not able to Add items'));
    }
  };

  changeHandler = (e) => {
    e.preventDefault();
    const item1 = e.target.value;
    this.setState({ item1 });
  }


  render() {
    // const postId = this.props.match.params.id;
    const {
      story,
      item1,
      smashItemName,
      allPost,
    } = this.state;
    const postIdS = this.props.match.params.id;
    const editItemFiltered = smashItemName.filter(a => a.postId === postIdS);

    const editItems = editItemFiltered.map((item) => {
      if (item.prodName === '') {
        return '';
      }
      return <EditItemForm
          key={item.prodId}
          item={item}
          userItem1={this.userItem1} />;
    });


    return (
      <div className="EditPost">
        <h3>New Form</h3>
        <div>
          <Form>
            <h5>{story}</h5>
            <FormGroup>
              <Label for="story">Your Story</Label>
              <Input type="textarea" name="text" id="story" value={allPost.postDesc} onChange={this.userStory} required />
            </FormGroup>
            <FormGroup>
              {editItems}
              <Label for="item1"></Label>
              <Input type="text" name="text" id="item1" placeholder="Item I need.." value={item1} onChange={this.changeHandler} />
              <Button className="btn btn-primary m-2" onClick={this.postNewProdAndItem}>+ More Item</Button>
            </FormGroup>

            <input type="submit" value="Update Post" className="btn btn-secondary m-5" onClick={this.updatePost} />
          </Form>
        </div>
      </div>
    );
  }
}

export default EditPost;
