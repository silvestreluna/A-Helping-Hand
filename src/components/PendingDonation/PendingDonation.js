import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import PendingDonationCard from '../PendingDonationCard/PendingDonationCard';


class PendingDonation extends React.Component {
  render() {
    const {
      allPost,
      itemsName,
      users,
      // myInfo,
      deletePost,
      changePostStatus,
    } = this.props;

    const eachPost = allPost.map((post) => {
      if (users.length && itemsName.length && post.isPosted === false) {
        const userName = users.find(user => user.uid === post.uid);
        const prodName = itemsName.filter(a => a.postId === post.id);
        return <PendingDonationCard key={post.id}
          userName={userName}
          users={users}
          prodName={prodName}
          // myInfo={myInfo}
          deletePost={deletePost}
          changePostStatus={changePostStatus}
          post={post} />;
      }
      return [];
    });

    return (
      <div className="AllPost">
        <div className="d-flex m-5">
          {eachPost}
        </div>
      </div>
    );
  }
}

export default PendingDonation;
