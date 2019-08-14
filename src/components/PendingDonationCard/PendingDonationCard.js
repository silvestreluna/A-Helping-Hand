import React from 'react';
import './PendingDonationCard.scss';

class PendingDonationCard extends React.Component {
  deleteMyPost = (e) => {
    e.preventDefault();
    const currentId = e.target.value;
    this.props.deletePost(currentId);
  }

  removeFromPendingStat = (e) => {
    e.preventDefault();
    const cardId = e.target.value;
    this.props.changePostStatus(cardId);
  }

  render() {
    const {
      post,
      userName,
      // users,
      prodName,
    } = this.props;
    const postItems = prodName.map((item) => {
      if (item.prodName === '') {
        return '';
      }
      return <li key={item.itemId}>{item.prodName}</li>;
    });

    return (
      <div className="PendingDonationCard col-md-4 mt-4">
        <div className="card text-center">
          <div className="alert alert-warning pend-post-header" role="alert">
            <h6>Someone will be contacting you soon to donate the requested item(s).</h6>
            <div className="post-header">
              <p className="card-text">{post.postDate}</p>
            </div>
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
            <div className="buttons-wrapper">
              <button value={post.id} className="btn btn-outline-info add-post-back" onClick={this.removeFromPendingStat}>Add Back</button>
              <button value={post.id} className="btn btn-outline-danger dlt-post" onClick={this.deleteMyPost}>Delete</button>
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

export default PendingDonationCard;
