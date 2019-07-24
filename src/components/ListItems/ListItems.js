import React from 'react';

class ListItems extends React.Component {
  render() {
    const { filteredItem } = this.props;
    const allItem = filteredItem.map(item => <li key={item.itemId} className="list-group-item">{item.prodName}</li>);
    return (
      <div className="ListItems">
        <ul className="list-group list-group-flush">
          {allItem}
        </ul>
      </div>
    );
  }
}

export default ListItems;
