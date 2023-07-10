import './successpopup.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessPopup(success, setSuccess) {

    return (
      <Alert 
            variant="success" 
            onClose={() => setSuccess('')} 
            dismissible
            id='success_popup_container'
            className='successFadeIn'>
        <Alert.Heading id='success_title'>Success!</Alert.Heading>
        <p>{success}</p>
      </Alert>
    );
  }

export default SuccessPopup;