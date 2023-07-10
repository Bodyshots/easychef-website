import './MyRecipes.css';
import '../../components/globals.css';
import { useEffect } from 'react';
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import RecipeCarousel from '../../components/RecipeCarousel';

function UserMyRecipes() {

    let [created, setCreated] = useState(null);
    let [favourited, setFavourited] = useState(null);
    let [interacted, setInteracted] = useState(null);

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
        setFavourited(res.data.favourites);
        setInteracted(res.data.interacted);
       
    }));
    }, []);
    return (
        <>
        <div className='myrecipes-page'>

        <div className='myrecipes-body'>

        
        <h1 className='myrecipes-header'>My Recipes</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(created)}
        </div>
        
        <h1 className='myrecipes-header'>Favourited Recipes</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(favourited)}
        </div>
        <h1 className='myrecipes-header'>Recipes you've recently interacted with</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(interacted)}
        </div>
        </div>
        </div>
        
        </>
        
    );
}

export default UserMyRecipes;