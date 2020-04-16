import React, { useState } from 'react';

function CommentEdit(props) {
  const [commentData, setCommentData] = useState(props.comment);

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      content: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleEditComment(commentData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentData.content}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentEdit;
