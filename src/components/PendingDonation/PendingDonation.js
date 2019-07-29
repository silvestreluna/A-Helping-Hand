import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import PendingDonationCard from '../PendingDonationCard/PendingDonationCard';


class PendingDonation extends React.Component {
  // render() {
  //   const posts = this.props.allPost;
  //   const { users, itemsName } = this.props;
  //   const currentUserUid = firebase.auth().currentUser.uid;

  //   // Calling this as allpost so I can pass as props.
  //   // Filtered from allPost by this user uid and
  //   // post.isPosted === false.
  //   // This leaves all post that are in pendingDonation status.
  //   const allPost = posts.filter(post => post.uid === currentUserUid && post.isPosted === false);
  //   console.error(allPost);
  //   return (
  //     <div className="PendingDonation">
  //       <PendingDonationCard allPost={allPost}/>
  //     </div>
  //   );
  // }
  render() {
    const {
      allPost,
      itemsName,
      users,
      // myInfo,
      deletePost,
    } = this.props;

    const eachPost = allPost.map((post) => {
      if (users.length && itemsName.length && post.isPosted === false) {
        const userName = users.find(user => user.uid === post.uid);
        const prodName = itemsName.filter(a => a.postId === post.id);
        return <PendingDonationCard key={post.id}
          userName={userName}
          prodName={prodName}
          // myInfo={myInfo}
          deletePost={deletePost}
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
