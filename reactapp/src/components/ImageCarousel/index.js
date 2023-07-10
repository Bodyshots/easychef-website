import Carousel from 'react-bootstrap/Carousel';
import './imagecarousel.css';
import noimage from '../../images/noimageavailable.png';

function ImageCarousel(props) {
  let files = props.files;
  return (
    <Carousel className='mediacarousel' fade>
      {files && files.map((file) => (
        <Carousel.Item>
        {file.type.slice(0,5) === 'image' && <img
          className="mediaincarousel"
          src={URL.createObjectURL(file)}
          alt="slide"
        />}
        {file.type.slice(0,5) === 'video' && <video
          className="mediaincarousel"
          key={file.name}
          src={URL.createObjectURL(file)}
          alt="slide"
          controls
        />}
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

export default ImageCarousel;