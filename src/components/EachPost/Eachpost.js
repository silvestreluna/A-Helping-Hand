import React from 'react';
import { Link } from 'react-router-dom';


class EachPost extends React.Component {
  deleteMyPost = (e) => {
    e.preventDefault();
    const currentId = e.target.value;
    this.props.deletePost(currentId);
  }

  render() {
    const {
      post,
      userName,
      prodName,
      myInfo,
    } = this.props;

    const editLink = `/editPost/${post.id}`;
    const donorLink = `/donate/${post.id}`;

    const postItems = prodName.map((item) => {
      if (item.prodName === '') {
        return '';
      }
      return <li key={item.itemId}>{item.prodName}</li>;
    });

    return (
      <div className="EachPost col-md-3 mb-5">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{userName.fName}</h5>
            <p className="card-text">{userName.loc}</p>
            <p className="card-text">{post.postDate}</p>
            <p className="card-text">{post.postDesc}</p>
            <div>
              <ul>
                {postItems}
              </ul>
            </div>
            {
              (myInfo === userName.uid)
                ? (
                  <div>
                    <Link className="btn btn-primary" to={editLink}>Edit</Link>
                    <button value={post.id} className="btn btn-danger" onClick={this.deleteMyPost}>Delete Post</button>
                  </div>
                )
                : (
                  <Link className="btn btn-outline-secondary" to={donorLink}>Donate Items</Link>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default EachPost;
