import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './recipecarousel.css';
import RecipeCard from '../RecipeCard';
import { useNavigate } from 'react-router-dom';


// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function RecipeCarousel(recipe_dict) {

    let recipes = [];
    const navigate = useNavigate();

      for (let key in recipe_dict) {
        recipes.push(recipe_dict[key]);
      }

      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "5px",
        slidesToShow: Math.min(3, recipes.length),
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
      };

  return (
    <>
        {(recipes && recipes.length > 0) ? <div className="recipecarousel">
        <Slider {...settings}>
            {recipes.map((item) => (
                <div onClick={() => navigate('/viewrecipe/' + item.recipe_details.id)} >
                    {RecipeCard(item)}
                </div>
            ))}
        </Slider>
        </div> : <div id='none_recipecarousel'>Hmmm... There are no recipes here!</div>}
    </>
  );
}

export default RecipeCarousel;