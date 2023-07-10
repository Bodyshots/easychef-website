import '../../components/globals.css';
import './viewrecipe.css';
import AnimatePage from '../../components/AnimatePage';
import { useState, useEffect, useContext} from 'react';
import AOS from "aos";
import StarRating from '../../components/StarRating';
import LikeButton from '../../components/LikeButton';
import FavButton from '../../components/FavButton';
import Paper from '@mui/material/Paper';
import ImageCarousel from '../../components/ImageCarousel';
import { useParams } from 'react-router-dom';
import DisplayImageCarousel from '../../components/DisplayImageCarousel'

function ViewRecipe() {
    const { recipeID } = useParams();
    let [recipe, setRecipe] = useState(null);
    let [instructions, setInstructions] = useState(null);
    let [ingredients, setIngredients] = useState(null);
    let [comments, setComments] = useState(null);
    let [images, setImages] = useState(null);
    let [videos, setVideos] = useState(null);
    let [likes, setlikes] = useState(0)
    let [liked, setLiked] = useState(false);
    let [fav, setFav] = useState(false);
    let access = String(localStorage.getItem('access'));
    let o = String(localStorage.getItem('email'));

    useEffect(() => {
        AOS.init({ duration: 1000 });
        displayRecipe();
    }, [])

    const displayRecipe = async () => {
        let request = {
            method: 'GET'
        }
        fetch("http://127.0.0.1:8000/recipes/" + recipeID + "/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
          if (res.response.ok) {
            setRecipe(res.data.recipe_details);
            setInstructions(res.data.instructions);
            setIngredients(res.data.ingredients);
            setImages(res.data.images);
        }
        }));
    }

    function handleFav(event){
        if (localStorage.access) {

        }
    }

    function handleLike(){
        if (localStorage.access) {
            
        }
    }



    return (
        <AnimatePage>
            {recipe && <div className="viewrecipecontainer">
                {console.log("on the right page")}
                <Paper elevation={24} className='recipepaper' data-aos="fade-left">
                    <h1 className='recipepapername'>{recipe.name}</h1>
                    {(access && (recipe.owner === o)) ? <button id='editrecipebutton'> Edit Recipe</button> : <></>}
                    <div className='recipeviewrow' data-aos="fade-up">
                    <DisplayImageCarousel items={images}/>
                    </div>
                    <div className='recipeviewrow' data-aos="fade-up">
                    {recipe.cook_time}
                    {recipe.prep_time}
                    </div>
                    <div className='recipeviewrow' data-aos="fade-up">
                        <div className='recipeviewcol' data-aos="fade-right">
                            <LikeButton onClick={handleLike}/>
                        </div>
                        <div className='recipeviewcol' data-aos="fade-up">
                            <StarRating/>
                        </div>
                        <div className='recipeviewcol' data-aos="fade-left">
                            <FavButton onClick={handleFav}/>
                        </div>
                    </div>
                    <div className='recipeviewrow' data-aos="fade-up">
                        <div className='recipeviewcol' data-aos="fade-right">
                        </div>
                        <div className='recipeviewcol' data-aos="fade-left">
                        </div>
                    </div>
                </Paper>
            </div> }
        </AnimatePage>
    );

} export default ViewRecipe;