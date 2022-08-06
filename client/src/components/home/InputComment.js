import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));

    if (setOnReply) return setOnReply(false);
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Add your comments...."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
