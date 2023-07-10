import './viewprofile.css';
import '../../components/globals.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import RecipeCarousel from '../../components/RecipeCarousel';

function UserViewProfile() {

    const [popup, setPopup] = useState(false);
    let [created, setCreated] = useState(null);

    const handleOpen = () => setPopup(true);
    const handleClose = () => setPopup(false);

    useEffect(() => {
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access')},
        }
        fetch("http://127.0.0.1:8000/accounts/myrecipes/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
    
        })
        ).then(res => {
            
            setCreated(res.data.myrecipes);
        }));
        }, []);

    return (
        <>
        <div className="container" id="viewprofile-page-body">
        <div className="row mb-3">
                                        
                                        <div className="col">
                                        <img className="img-account-profile viewprofile-img rounded-circle mb-2" src={localStorage.getItem('avatar')} alt=""/>
                                        </div>

                                        <div className="col viewprofile-col">
                                        <h1>{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</h1>
                                        <h2>{localStorage.getItem('email')}</h2>
                                        <h2>{localStorage.getItem('phone_number')}</h2>
                                        </div>
         
                                        <div className="col viewprofile-col viewprofile-bio">
                                        {/*Text truncation method obtained from https://stackoverflow.com/a/68152235 */}
                                        <p>{localStorage.getItem('description').substring(0, 70)}{localStorage.getItem('description').length >= 70 && '...'}</p>
                                        {localStorage.getItem('description').length >= 70 && 
                                        <Button className="btn card shop_item shop_item_button" id="ingredients_card" onClick={() => handleOpen()}>
                                        View Full Biography
                                        </Button>}
                                        <Modal 
                            show={popup} 
                            onHide={handleClose} 
                            id='ingredients_modal'
                            contentClassName = 'ingredients_content'
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{localStorage.getItem('first_name')}'s Biography</Modal.Title>
                            </Modal.Header>
                            <Modal.Body id='ingredients_content'>
                            {localStorage.getItem('description')}
                            </Modal.Body>
                            <Modal.Footer id='ingredients_modal_footer'>
                                <Button variant="primary" onClick={handleClose} className='shop_lst_btn'>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                                        
                                        </div>
                                    </div>


        </div>
        <div className="container" id="viewprofile-recipes">
            <h1>{localStorage.getItem('first_name')}'s Recipes</h1>
        {RecipeCarousel(created)}
        </div>
        </>

    );

}

export default UserViewProfile;