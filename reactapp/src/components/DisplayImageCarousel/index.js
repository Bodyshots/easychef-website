import Carousel from 'react-bootstrap/Carousel';
import './viewimagecarousel.css';
import noimage from '../../images/noimageavailable.png'

function DisplayImageCarousel(props) {
  let files = props.images;
  return (
    <Carousel className='mediacarousel' fade>
      {files && files.map((item) => (
        <Carousel.Item>
        
      </Carousel.Item>
        ))}
      {!files && 
        <Carousel.Item>
        <img
                src={noimage}
                alt="No Image Found"
                id='recipecard_img'
            />
      </Carousel.Item>}
    </Carousel>
  );
}

export default DisplayImageCarousel;