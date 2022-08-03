import React, { useEffect, useState } from "react";
import CommentDisplay from "./comments/CommentDisplay";
const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comment, next]);
  return (
    post.comments.length > 0 && (
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentDisplay key={comment._id} comment={comment} post={post} />
        ))}
      </div>
    )
  );
};

export default Comments;
