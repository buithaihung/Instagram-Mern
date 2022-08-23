import React, { useState, useEffect } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import { addUser } from "../../redux/actions/messageAction";
import { getConversations } from "../../redux/actions/messageAction";
const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);
    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };
  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };
  useEffect(() => {
    if(message.firstLoad) return;
    dispatch(getConversations({auth}))
  }, [dispatch, auth, message.firstLoad])
  
  return (
    <>
      <form className="message_header" onClick={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
      </form>
      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  <i className="fas fa-circle active" />
                </UserCard>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSide;
