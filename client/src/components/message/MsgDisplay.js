import React from "react";
import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";
const MsgDisplay = ({ user, msg, theme, data }) => {
  const dispatch = useDispatch()
  // console.log(msg);
  const { auth } = useSelector((state) => state);
  const handleDeleteMessages = () => {
    if(data) {
      dispatch(deleteMessages({msg,data,auth}))
    }
  }
  // console.log(msg.media);
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="you_content">
        {user._id === auth.user._id && (
          <i className="fas fa-trash text-danger" onClick={handleDeleteMessages}/>
          
        )}

        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            >
              {msg.text}
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </div>
    </>
  );
};

export default MsgDisplay;
