import React from 'react';
import EachPost from '../EachPost/Eachpost';

class AllPost extends React.Component {
  render() {
    const {
      allPost,
      itemsName,
      users,
      myInfo,
      deletePost,
    } = this.props;

    const eachPost = allPost.map((post) => {
      if (users.length && itemsName.length && post.isPosted === true) {
        const userName = users.find(user => user.uid === post.uid);
        const prodName = itemsName.filter(a => a.postId === post.id);
        return <EachPost key={post.id}
          userName={userName}
          prodName={prodName}
          myInfo={myInfo}
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

export default AllPost;
