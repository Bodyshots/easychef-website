import './errorpopup.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorPopup(error, setError) {

    return (
      <Alert 
            variant="danger" 
            onClose={() => setError('')} 
            dismissible
            id='error_popup_container'
            className='errorFadeIn'>
        <Alert.Heading id='error_title'>Whoops!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

export default ErrorPopup;