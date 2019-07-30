import React from 'react';

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
      <div className="PendingDonationCard col-3">
        <div className="card text-center">
          <div className="alert alert-warning" role="alert">
            <h5>Someone will be contacting you soon to donate the requested item(s).</h5>
          </div>
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
            <div>
              <button value={post.id}className="btn btn-info" onClick={this.removeFromPendingStat}>Remove from Pending Status</button>
              <button value={post.id} className="btn btn-danger" onClick={this.deleteMyPost}>Delete Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PendingDonationCard;
