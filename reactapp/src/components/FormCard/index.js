import './formcard.css'
import Card from 'react-bootstrap/Card';
import ShortTextInput from '../ShortTextInput';
import LongTextInput from '../LongTextInput';
import ImageCarousel from '../ImageCarousel';
import RadioBall from '../../components/RadioBall';
import { useState, useEffect } from 'react';
import AutoCompleteIngredients from '../AutoCompleteIngredients';
import ServingsSlider from '../ServingsSlider';

function FormCard(props) {
    
    return (
        <Card className='formcard'>
                <Card.Body className={props.className}>
                    <Card.Title className='formcardtitle'>{props.title}</Card.Title>
                    {props.type === 'shorttext' && <ShortTextInput placeholder={props.placeholder} Change={props.Change}/>}
                    {props.type === 'longtext' && <LongTextInput placeholder={props.placeholder} Change={props.Change}/>}
                    {props.type === 'file' && <ImageCarousel files={props.files}/>}
                    {props.type === 'file' && <input type='file' onChange={(event) => props.Change([...event.target.files])} accept="image/*, video/*" multiple/>}
                    {props.type === 'radio' && <RadioBall Change={props.Change}/>}
                    {props.type === 'servingsslider' && <ServingsSlider Change={props.Change}/>}
                    {props.type === 'ingredientsearch' && <AutoCompleteIngredients Change={props.Change} items={props.items}/>}
                    {props.type === 'timefield' && <ShortTextInput placeholder={props.placeholder} pattern='\d+:\d+\d+' Change={props.Change}/>}
                </Card.Body>
        </Card>
        );
}
export default FormCard;