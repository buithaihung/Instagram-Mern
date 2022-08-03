import React from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post }) => {
  // console.log(comment);
  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post}>
      </CommentCard>

    </div>
  );
};

export default CommentDisplay;
