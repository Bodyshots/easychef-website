import React from 'react';
import './profile.css'
import { UserContext } from '../../../App';
import { useContext } from 'react';

function ProfileDropItem() {

    const {email, firstName, lastName, phoneNum, avatar} = useContext(UserContext);

    return (
    <div className="profile" id={email}>
        <div id='profiledrop_wrap'>
            <img id='profilepic'
                src={avatar}
                alt={"Profile"}
            />
        <p>
        <span id='profiledrop_name'>{firstName + ' ' + lastName}<br /></span>
        <b>{email}</b>
        <span id='profiledrop_phone'><br />{phoneNum}</span>
        </p>
        </div>
    </div>
    );
}

export default ProfileDropItem;