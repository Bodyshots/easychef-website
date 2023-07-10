import './EditProfile.css';
import '../../components/globals.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState } from 'react';


function UserEditProfile() {

    const {
            setFirstName,
            setLastName,
            setDescription,
            setPhoneNum,
            setEmail,
            setPassword,
            setError,
            setSuccess,
            } = useContext(UserContext);
    let [formEmail, setFormEmail] = useState(localStorage.getItem('email'));
    let [email_error, setEmailError] = useState('');
    let [formPassword, setFormPassword] = useState('');
    let [password_error, setPassError] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [newPassword_error, setNewPassError] = useState('');
    let [confirmPass, setConfirmPassword] = useState('');
    let [formFirstName, setFormFirstName] = useState(localStorage.getItem('first_name'));
    let [fname_error, setFNameError] = useState('');
    let [formLastName, setFormLastName] = useState(localStorage.getItem('last_name'));
    let [lname_error, setLNameError] = useState('');
    let [formDescription, setFormDescription] = useState(localStorage.getItem('description'));
    let [formPhoneNum, setFormPhoneNum] = useState(localStorage.getItem('phone_number'));
    let [phone_error, setPhoneError] = useState('');
    let [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

    let handleInput = (i) => {
        let {id, value} = i.target;
        
        if (id === "inputEmailAddress") {
            setFormEmail(value);
            setEmailError('');

        }
        if (id === "oldPass") {
            
            setFormPassword(value);
            setPassError('');
        }
        if (id === 'inputFirstName') {
            setFormFirstName(value);
            setFNameError('');


        }
        if (id === 'inputLastName') {
            setFormLastName(value);
            setLNameError('');

        }
        if (id === 'biography') {
            setFormDescription(value);

            
        }
        if (id === 'inputPhone') {
            setFormPhoneNum(value);
            setPhoneError('');

        }
        if (id === 'newPass') {
            setNewPassword(value);
            setNewPassError('');
        }
        if (id === 'confirmPass') {
            setConfirmPassword(value);
            
        }

    }

    let submitDetails = () => {
        let request = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'email': formEmail, 'first_name': formFirstName, 'last_name': formLastName, 'description': formDescription, 'phone_number': formPhoneNum})
        }
        fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
            if (res.response.ok) {
                localStorage.setItem('email', res.data.email);
            localStorage.setItem('first_name', res.data.first_name);
            localStorage.setItem('last_name', res.data.last_name);    
               
            if (res.data.description) {
                localStorage.setItem('description', res.data.description);
            }
            else {
                localStorage.setItem('description', '');
            }
            if (res.data.phone_number) {
                localStorage.setItem('phone_number', res.data.phone_number);
            }
            else {
                    localStorage.setItem('phone_number', '');
            }
            setSuccess("Profile was succesfully updated!");

            }
            else {
                setError("There were some errors editing your profile. Please double-check your information!");

                
                if (res.data.email) setEmailError(res.data.email);
                if (res.data.first_name) setFNameError(res.data.first_name[0]);
                if (res.data.last_name) setLNameError(res.data.last_name[0]);
                if (res.data.phone_number) setPhoneError(res.data.phone_number[0]);
            }

            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setDescription(res.data.description);
            setPhoneNum(res.data.phone_number);
            
        }));
    }

    let uploadPic = () => {
        document.getElementById('selectedFile').click();

    }

    let submitPic = () => {

        if (document.getElementById('selectedFile').value) {
            
            
            let formdata = new FormData();
            formdata.append('avatar', document.getElementById('selectedFile').files[0]);

            
            let request = {
                method: 'PATCH',
                headers: {'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
                body: formdata
            }
            fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
            .then(response => response.json()
            .then(data => ({
                data: data,
                response: response
            })
            ).then(res => {
                if (res.response.ok) {
                setSuccess("Your profile picture has been changed!");
                localStorage.setItem('avatar', res.data.avatar);
                setAvatar(res.data.avatar);

                }
                else {
                    setError("Failed to update your profile picture.");
                }
                
            }));

            
        }
        
    }

    let submitPass = () => {
        
        if (formPassword === localStorage.getItem('password') && newPassword === confirmPass && newPassword !== '') {
            let request = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
                body: JSON.stringify({'password': newPassword})
            }
            fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
            setSuccess("Your password has been updated!");
            localStorage.setItem('password', newPassword);
            setPassword(newPassword);
        }));

        
        }
        else {
            if (formPassword !== localStorage.getItem('password')) {
                setPassError("Your password was incorrect.");
            }
            if (newPassword.length === 0) {
                setNewPassError("Your new password cannot be blank.");

            }
            if (newPassword !== confirmPass) {
                setNewPassError("The two passwords you entered did not match.");
            }
            setError("Failed to change password.");
        }
    }
            
            return (
                <>
                
                <div className="container" id="page-body">
                <h2 className='edit-profile-title'>Edit Profile</h2>
                <hr className="mt-0 mb-4"/>
                <div className="row" id="profilegrid">
                    <div className="col">
                        
                        <div className=" editprofile card" id="profilecard">
                            <div className="editprofile card-header edit-header">Profile Picture</div>
                            <div className="editprofile card-body text-center">
                                
                                <img className="img-account-profile rounded-circle mb-2" src={avatar} alt=""/>
                               
                                <div className="small font-italic text-muted mb-4">Current Profile Picture</div>
                                {/*Button Based off https://stackoverflow.com/a/14806776 */}
                                <input type="file" id="selectedFile" onChange={()=>submitPic()} accept='image/*'/>
                                <button className="btn btn-profile" onClick={()=>uploadPic()}>Upload new image</button>
                            </div>
                        </div>
                    </div>
                    <div className="col grid-row-span-2">
                        
                        <div className="editprofile card mb-4">
                            <div className="editprofile card-header edit-header">Account Details</div>
                            <div className="editprofile card-body">
                                <form id="profile-form">
                                   
                                   
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputFirstName">First name</label>
                                            <input className="form-control profile-field" id="inputFirstName" type="text" value={formFirstName} onChange={(i) => handleInput(i)} placeholder="Enter your first name" />
                                            <label className="small mb-1 editprofile-error" for="inputFirstName">{fname_error}</label>
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputLastName">Last name</label>
                                            <input className="form-control profile-field" id="inputLastName" type="text" value={formLastName} onChange={(i) => handleInput(i)} placeholder="Enter your last name"/>
                                            <label className="small mb-1 editprofile-error" for="inputLastName">{lname_error}</label>
                                        </div>
                                    </div>
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputEmailAddress">Email Address</label>
        
                                            <input className="form-control profile-field" id="inputEmailAddress" type="email" value={formEmail} onChange={(i) => handleInput(i)} placeholder="Enter your email address"/>
                                            <label className="small mb-1 editprofile-error" for="inputEmailAddress">{email_error}</label>
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputPhone">Phone number</label>
                                            <input className="form-control profile-field" id="inputPhone" onChange={(i) => handleInput(i)} value={formPhoneNum} type="tel" placeholder="Ex: +12345678910"/>
                                            <label className="small mb-1 editprofile-error" for="inputPhone">{phone_error}</label>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="mb-3">
                                        <label className="small mb-1 details-box" for="feedback">Bio</label>
                                        <textarea className="form-control profile-field" rows="8" cols="80" name="biography" id="biography" value={formDescription} onChange={(i) => handleInput(i)} placeholder="Tell us about yourself!"></textarea>
                                        
                                    </div>
                                    
                                    
                                    
                                    <button className="btn btn-profile" id="save-profile-button" onClick={()=>submitDetails()} type="button">Save Changes</button>
                                </form>
                            </div>
        
                        </div>
                  </div>
        
                  <div className="col" id="password-card">
                    
                    <div className="editprofile card mb-4">
                        <div className="editprofile card-header edit-header">Password</div>
                        <div className="editprofile card-body">
                        <form id="password-form">
                        <div className="mb-3">
                            <label className="small mb-1" for="oldPass">Old Password</label>
                            <input className="form-control profile-field" id="oldPass" onChange={(i) => handleInput(i)} type="password" value={formPassword} placeholder="Enter your password"/>
                            <label className="small mb-1 editprofile-error" for="oldPass">{password_error}</label>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="newPass">New Password</label>
                          <input className="form-control profile-field" id="newPass" onChange={(i) => handleInput(i)} type="password" value={newPassword} placeholder="Enter your new password"/>
                          <label className="small mb-1 editprofile-error" for="newPass">{newPassword_error}</label>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="confirmPass">Confirm New Password</label>
                          <input className="form-control profile-field" id="confirmPass" onChange={(i) => handleInput(i)} type="password" value={confirmPass} placeholder="Confirm your new password"/>
                        </div>
                        <button className="btn btn-profile" id="save-password-button" onClick={()=>submitPass()} type="button">Change Password</button>
                        </form>
        
                        </div>
                    </div>
                </div>
        
              </div>
        
        
              </div>
        
              
                </>
            )
    
}
export default UserEditProfile;
