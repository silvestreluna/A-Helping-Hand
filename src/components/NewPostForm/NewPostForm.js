import React from 'react';
import {
  // Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';

const defaultPost = {
  story: '',
  item1: '',
  item2: '',
  item3: '',
  item4: '',
};

class NewPostForm extends React.Component {
  state = {
    newPost: defaultPost,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempPost = { ...this.state.newPost };
    tempPost[name] = e.target.value;
    this.setState({ newPost: tempPost });
  }

  userStory = e => this.formFieldStringState('story', e);

  userItem1 = e => this.formFieldStringState('item1', e);

  userItem2 = e => this.formFieldStringState('item2', e);

  userItem3 = e => this.formFieldStringState('item3', e);

  userItem4 = e => this.formFieldStringState('item4', e);


    putApost = (e) => {
      e.preventDefault();
      const { uid } = firebase.auth().currentUser;
      const copyPost = { ...this.state.newPost };
      const newPostObje = {
        isPosted: true,
        uid,
        postDate: util.addDateAndTime(),
        postDesc: copyPost.story,
      };
      console.error(newPostObje, 'this');
    }

    render() {
      const { newPost } = this.state;

      return (
      <div className="NewPostForm">
        <h3>New Form</h3>
        <Form onSubmit={this.putApost}>
        <FormGroup>
          <Label for="story">Your Story</Label>
          <Input type="textarea" name="text" id="story" value={newPost.story} onChange={this.userStory} />
        </FormGroup>
        <FormGroup>
          <Label for="item1">Stuff I Need:</Label>
          <Input type="text" name="text" id="item1" placeholder="Shoe" value={newPost.item1} onChange={this.userItem1}/>

          <Label for="item2"></Label>
          <Input type="text" name="text" id="item2" placeholder="Shoe" />

          <Label for="item3"></Label>
          <Input type="text" name="text" id="item3" placeholder="Shoe" />

          <Label for="item4"></Label>
          <Input type="text" name="text" id="item4" placeholder="Shoe" />
        </FormGroup>
        <input type="submit" value="Submit" className="btn btn-secondary"/>
      </Form>
      </div>
      );
    }
}

export default NewPostForm;
