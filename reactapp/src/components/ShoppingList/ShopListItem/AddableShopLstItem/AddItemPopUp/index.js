import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import './additempopup.css';
import  '../../../../../components/globals.css';

function AddItemPopUp() {
    return (
        <Container className="container-lg">
            <Button type="button" className="btn card shop_item" id="add_card">
                <div className="plus radius" id='add_btn'>
                </div>
            </Button>
        </Container>
    );
}

export default AddItemPopUp;