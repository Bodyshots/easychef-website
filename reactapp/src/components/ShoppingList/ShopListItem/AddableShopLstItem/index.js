import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import ShopListItem from '..';

import '../../shop_lst.css';
import '../shopitem.css';
import './addshoplstitem.css';
import  '../../../../components/globals.css';

// Some Popup code from:
// https://github.com/Ziratsu/React-modal-yt/blob/main/src/Components/Modal/Modal.js
function AddableShopLstItem() {
    const [popup, setPopup] = useState(false);
    const togglePopup = () => setPopup(!popup);

    if (popup) document.body.classList.add('active_addshopitem_popup');
    else document.body.classList.remove('active_addshopitem_popup');

    return (
        <div className='shop_item_container'>
            <Button className="btn card shop_item" id="add_card" onClick={togglePopup}>
                <div className="plus radius" id='add_btn'>
                </div>
            </Button>
            <Modal 
                show={popup} 
                onHide={togglePopup} 
                id='addshoprecipe_modal'
                contentClassName = 'addshoprecipe_content'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a recipe to your shopping list</Modal.Title>
                </Modal.Header>
                <Modal.Body id='addshoprecipe_content'>
                    <Form className="d-flex" role="search" id="shop_search">
                        <Form.Control
                            type="search"
                            placeholder = "What recipes do you want to add?"
                            aria-label="Add Shopping List Recipe"
                            id="add_shoplstrecipe"
                        />
                    </Form>
                    {ShopListItem('test')}
                </Modal.Body>
                <Modal.Footer id='addshoprecipe_modal_footer'>
                    <Button variant="primary" onClick={togglePopup} className='shop_lst_btn'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddableShopLstItem;