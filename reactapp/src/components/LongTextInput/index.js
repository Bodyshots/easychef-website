import './longtextinput.css'
import React, { useState, useRef, useEffect } from "react";

function LongTextInput(props) {
    const [val, setVal] = useState("");
    const textAreaRef = useRef(null);

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(resizeTextArea, [val]);

    const onChange = e => {
        setVal(e.target.value);
        props.Change(e.target.value)
    };
    return (<textarea className='textinput' ref={textAreaRef} value={val} onChange={onChange} rows={1} cols={66} placeholder={props.placeholder} name="text"/> );
}

export default LongTextInput;

