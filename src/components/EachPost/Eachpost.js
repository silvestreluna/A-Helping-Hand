import React from 'react';
import { Link } from 'react-router-dom';

import './EachPost.scss';


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
      <div className="EachPost col-3 mb-5">
        <div className="card text-center">
          <div className="post-header">
            <p className="card-text">{post.postDate}</p>
          </div>
          <div className="card-body">
            <div className="post-story">
              <p className="card-text">{post.postDesc}</p>
            </div>
            <div className="post-items">
              <ul>
                {postItems}
              </ul>
            </div>
            <div className="post-btn-wrapper">
              {
                (myInfo === userName.uid)
                  ? (
                    <div>
                      <Link className="btn btn-primary" to={editLink}>Edit</Link>
                      <button value={post.id} className="btn btn-danger" onClick={this.deleteMyPost}>Delete Post</button>
                    </div>
                  )
                  : (
                    <Link className="btn btn-outline-secondary donate-btn" to={donorLink}>Donate</Link>
                  )
              }
            </div>
            <div className="post-footer">
              <span className="card-title">{userName.fName}</span>
              <span className="card-text">{userName.loc}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EachPost;
