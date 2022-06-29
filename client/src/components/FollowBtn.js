import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  // const [load, setLoad] = useState(false)
  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    setFollowed(true);
    dispatch(follow({ users: profile.users, user, auth }));
  };

  const handleUnFollow = async () => {
    setFollowed(false);
    dispatch(unfollow({ users: profile.users, user, auth }));
  };

  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>
          UnFollow
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
