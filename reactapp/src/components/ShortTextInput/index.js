import './shorttextinput.css'
function ShortTextInput(props) {

    function HandleChange(event){
        props.Change(event.target.value);
    }

    return (<input type="text" className='textinput' size="66" placeholder={props.placeholder} pattern={props.pattern} onChange={HandleChange}/> );
}

export default ShortTextInput;