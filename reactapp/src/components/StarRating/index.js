import Rating from '@mui/material/Rating';
import { propTypes } from 'react-bootstrap/esm/Image';

function StarRating(props) {

    function HandleChange(event) {
        props.Change(event.target.value);
    }

    return (
        <Rating name="half-rating" defaultValue={props.default} precision={0.1} onChange={HandleChange} />
    );
}
export default StarRating;