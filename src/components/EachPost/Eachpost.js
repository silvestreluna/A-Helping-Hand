import React from 'react';

class EachPost extends React.Component {
  render() {
    const {
      post,
      userName,
      prodName,
    } = this.props;
    const postItems = prodName.map(item => <li key={item.itemId}>{item.prodName}</li>);
    return (
      <div className="EachPost col-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{userName.fName}</h5>
              <p className="card-text">{userName.loc}</p>
              <p className="card-text">{post.postDate}</p>
              <p className="card-text">{post.postDesc}</p>
              {postItems}
              <button className="btn btn-outline-secondary">Help</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EachPost;
