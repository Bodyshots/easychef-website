import React, { useEffect, createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import AnimatedRoutes from './components/AnimatedRoutes';
import ToTopBtn from './components/ToTopBtn';
import { useState } from 'react';
import defavatar from './images/defaultavatar.png';
import LoadingComp from './components/Loading';
import ErrorPopup from './components/ErrorPopup';
import SuccessPopup from './components/SuccessPopup';

export const UserContext = createContext(null);
export const SearchContext = createContext(null);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNum, setPhoneNum] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [description, setDescription] = useState('');
    const [pageLoading, setPageLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userStates = {
        auth: auth,
        setAuth: setAuth,
        loading: loading,
        setLoading: setLoading,
        pageLoading: pageLoading,
        setPageLoading: setPageLoading,
        error: error,
        setError: setError,
        success: success,
        setSuccess: setSuccess,
        firstName: firstName,
        setFirstName: setFirstName,
        lastName: lastName,
        setLastName: setLastName,
        phoneNum: phoneNum,
        setPhoneNum: setPhoneNum,
        avatar: avatar,
        setAvatar: setAvatar,
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        description: description,
        setDescription: setDescription
    }

    useEffect(() => {
        setPageLoading(true);

        // Jwt expiration checker from
        // https://www.bezkoder.com/handle-jwt-token-expiration-react/
        const parseJwt = (token) => {
            try {
              return JSON.parse(atob(token.split(".")[1]));
            } catch (e) {
              return null;
            }
          };

        const token = localStorage.getItem('access');
        if (token) {
            const decodedtoken = parseJwt(token);
            if (decodedtoken.exp * 1000 < Date.now()) {
                localStorage.clear();
                setAuth(false);
                setPageLoading(false);
                return;
            }
            else setAuth(true);
        }
        else {
            setAuth(false);
            setPageLoading(false);
            return;
        }

        setFirstName(localStorage.getItem('first_name'));
        let last_name = localStorage.getItem('last_name');
        setAvatar(localStorage.getItem('avatar') || defavatar);
        setLastName(last_name);
        setEmail(localStorage.getItem('email'));
        setPassword(localStorage.getItem('password'));
        setPhoneNum(localStorage.getItem('phone_number'));
        setDescription(localStorage.getItem('description'));

        setPageLoading(false);
    }, [loading, pageLoading, firstName, lastName, phoneNum, avatar, email, password, description,
        avatar]);

    const [pageNum, setPageNum] = useState(1);
    const [ suggestions, setSuggestions ] = useState([]);

    const searchStates = {
        pageNum: pageNum,
        setPageNum: setPageNum,
        suggestions: suggestions,
        setSuggestions: setSuggestions,
    }

    return (
        <>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossOrigin="anonymous"
        />
            <Router>
            <SearchContext.Provider value={searchStates}>
                <UserContext.Provider value={userStates}>
                    <NavBar />
                    <AnimatedRoutes />
                </UserContext.Provider>
            </SearchContext.Provider>
            </Router>
            {loading && <LoadingComp/>}
            {error && ErrorPopup(error, setError)}
            {success && SuccessPopup(success, setSuccess)}
            <Container id='footer_container'>
                <ToTopBtn/>
                <p id='footer'>  
                    Copyright © 2023 Easy Chef Incorporated<br />
                    All Rights Reserved
                </p>  
            </Container>
        </>
    );
}

export default App;
