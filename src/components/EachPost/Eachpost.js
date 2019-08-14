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
      <div className="EachPost col-md-4 mb-5">
        <div className="card text-center">
          <div className="post-header">
            <p className="card-text">{post.postDate}</p>
          </div>
          <div className="card-body">
            <div className="post-story">
              <p className="card-text">{post.postDesc}</p>
            </div>
            <hr className="line-divider"/>
            <div className="post-items">
              <ul>
                {postItems}
              </ul>
            </div>
            <div className="post-btn-wrapper">
              {
                (myInfo === userName.uid)
                  ? (
                    <div className="dltEdit-buttons-wrapper">
                      <Link className="btn btn-outline-primary edit-btn" to={editLink}>Edit</Link>
                      <button value={post.id} className="btn btn-outline-danger dlt-btn" onClick={this.deleteMyPost}>Delete</button>
                    </div>
                  )
                  : (
                    <Link className="btn btn-outline-secondary donate-btn" to={donorLink}>Donate</Link>
                  )
              }
            </div>
            <div className="post-footer">
              <span className="card-title">{userName.fName}</span>
              <span className="card-text"><i className="fas fa-map-marker-alt"></i> {userName.loc}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EachPost;
