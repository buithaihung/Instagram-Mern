import React, { useEffect } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector } from "react-redux";
import { getProfileUsers } from "../../redux/actions/profileAction";
import LoadIcon from "../../images/loading.gif";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
    }
  }, [dispatch, id, profile.users, auth, profile.ids]);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {profile.loading ? (
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="" />
      ) : (
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  );
};

export default Profile;
