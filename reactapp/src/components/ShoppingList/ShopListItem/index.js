import './shopitem.css';
import  '../../globals.css';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import noimage from '../../../images/noimageavailable.png'

function ShopListItem(item, delFunc, changeServing, popup, 
                      handleOpen, handleClose, isActive, index,
                      buttonNav) {

    const shopitemid = item.shoplstrecipe_id;

    return (
        <div className='shop_item_container' data-aos="flip-left" data-aos-offset='0px'>
            <div className="card shoplistcard shop_item recipe">
                <div className="shop_recipe_item">
                    <div className="shop_item_pic_area"> 
                    {/* <!-- Egg sandwich information from https://www.foodnetwork.com/recipes/fried-egg-sandwich-3529179 --> */}
                        <img 
                            src={item.pic_rep ? item.pic_rep : noimage}
                            alt={item.orig_id}
                            className="shop_item_pic"
                        />
                    </div>
                    <p className="recipe_name">{item.recipe_name}</p>
                    <div className="shop_item_details">
                        <div id="brief_info">
                            <div className="servings">
                                <div className="col-auto">
                                <label className="col-form-label">Servings:</label>
                                </div>
                                <div className="col-auto">
                                <input type="number" 
                                        id="inputserving" 
                                        defaultValue={item.servings ? item.servings : ''} 
                                        className="form-control inputserving"
                                        min="0"
                                        step="1"
                                        maxLength="3"
                                        onBlur={(e) => changeServing(e, item)}
                                        pattern="/d+"/>
                                </div>
                            </div>
                            Cooking time: {'' + item.cook_time} mins
                        </div>
                        <Button className="shop_item_button" onClick={() => buttonNav(item.orig_id)}>
                            Details
                        </Button>
                        <Button className="btn card shop_item shop_item_button" id="ingredients_card" onClick={() => handleOpen(index)}>
                            Ingredients
                        </Button>
                        <Modal 
                            show={isActive === index && popup} 
                            onHide={handleClose} 
                            id='ingredients_modal'
                            contentClassName = 'ingredients_content'
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add a recipe to your shopping list</Modal.Title>
                            </Modal.Header>
                            <Modal.Body id='ingredients_content'>
                            <ul id='ingredients_lst'>
                            {Object.keys(item.ingredients).map((key, index) => 
                                <li as="p"
                                    key={key}>
                                        {item.ingredients[key]} {key}
                                </li>)}
                            </ul>
                            </Modal.Body>
                            <Modal.Footer id='ingredients_modal_footer'>
                                <Button variant="primary" onClick={handleClose} className='shop_lst_btn'>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Button 
                        id='close_btn'
                        className='trans_back'
                        onClick={() => delFunc(shopitemid)}>
                        <span id='close_item' className='plus'></span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ShopListItem;