import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({users, setShowFollowers}) => {
  return (
    <div className='follow'>
      <div className='follow_box'>
        <h5>Followers</h5>
        <hr/>
        {}
      </div>
    </div>
  )
}

export default Followers