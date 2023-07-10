import './servingsslider.css'
import Slider from '@mui/material/Slider';

function ServingsSlider(props) {

    function HandleChange(e) {
        props.Change(e.target.value);
    }

    return (
        <Slider className='ServingsSlider' onChange={HandleChange} minvalue={1} defaultValue={1} step={1} valueLabelDisplay="on"></Slider>
    )
} export default ServingsSlider;