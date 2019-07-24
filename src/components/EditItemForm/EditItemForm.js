import React from 'react';
import { Input, Label } from 'reactstrap';

class EditItemForm extends React.Component {
  state = {
    newName: '',
  }

  changeHandler = (e) => {
    e.preventDefault();
    const { item } = this.props;
    const newName = e.target.value;
    this.setState({ newName });
    this.props.userItem1(item.itemId, item.prodId, newName);
  }

  render() {
    const { item } = this.props;
    const { newName } = this.state;


    const nameToShow = () => {
      if (newName === '') {
        return item.prodName;
      }
      return newName;
    };

    return (
      <div className="EditItemForm">
        <Label for="editItem"></Label>
        <Input type="text" name="text" id="editItem" value={nameToShow()} onChange={this.changeHandler} />
      </div>
    );
  }
}

export default EditItemForm;
