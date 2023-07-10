

import React from 'react';
import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import './topbtn.css';
import {FaArrowCircleUp} from 'react-icons/fa';

// Code from https://www.youtube.com/watch?v=pKbNCWb6USQ
// and https://stackoverflow.com/questions/70375135/transition-effect-when-button-gets-visible-invisible-in-react
function ToTopBtn() {
    const [toTopBtn, setVisible] = useState(false);
    const toggleVisible = () => {
        if (
          document.body.scrollTop > 1250 ||
          document.documentElement.scrollTop > 1250
        ) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };
    
      useEffect(() => {
        // Listen for Scrolling Event
        window.addEventListener("scroll", toggleVisible, false);
        return () => {
          window.removeEventListener("scroll", toggleVisible, false);
        }
      }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return <div className="App">
        {toTopBtn && (
            <Button 
                id='topbtn' 
                onClick={scrollUp}
                className={toTopBtn ? 'back-to-top-visible': null}>
                <FaArrowCircleUp/>
            </Button>
        )}
    </div>
}

export default ToTopBtn;