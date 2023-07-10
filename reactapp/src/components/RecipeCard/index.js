import React from 'react';
import noimage from '../../images/noimageavailable.png'
import './recipecard.css'

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function RecipeCard(item) {

    const recipe = item.recipe_details;
    const recipe_desc = recipe.description;

    return (
    <div className="recipecard gradient" key={item.id}>
        <div className="recipecard-top img_wrap">
            <img
                src={
                    Object.keys(item.images).length > 0 ? 'http://127.0.0.1:8000' + Object.values(item.images)[0] : noimage
                }
                alt={recipe.name}
                id='recipecard_img'
            />
        <div id='card_info'>
            <h1 className='card_text'>Star rating: {recipe.star_rating} | Favourited: {recipe.favourited}</h1>
            </div>
            <div className="recipecard-bottom">
                <h3 className='card_text'>{recipe.name.length > 15 ? recipe.name.substring(0, 15) + '...' : recipe.name}</h3>
                <span className="recipecat card_text">Cooking time: {recipe.cook_time}</span>
            </div>
            <p className='card_text' id='card_desc'>{recipe_desc.length > 25 ? recipe_desc + '...'
                                                    : recipe_desc.length === 0
                                                    ? 'No description' 
                                                    : recipe_desc}</p>
        </div>
    </div>
    );
}

export default RecipeCard;