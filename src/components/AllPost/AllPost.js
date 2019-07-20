import React from 'react';
import EachPost from '../EachPost/Eachpost';

class AllPost extends React.Component {
  render() {
    const {
      allPost,
      itemsName,
      // items,
      // prods,
      users,
    } = this.props;

    const eachPost = allPost.map((post) => {
      if (users.length && itemsName.length) {
        const userName = users.find(user => user.uid === post.uid);
        const prodName = itemsName.filter(a => a.postId === post.id);
        return <EachPost key={post.id}
          userName={userName}
          prodName={prodName}
          post={post} />;
      }
      return [];
    });

    return (
      <div className="AllPost">
        <div className="d-flex">
          {eachPost}
        </div>
      </div>
    );
  }
}

export default AllPost;
