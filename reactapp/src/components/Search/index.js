import './search.css';
import  '../globals.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useRef } from 'react';

function Search(onChangeFunc, placehold_text, set_id, 
                searchResults) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw

    const [value, setValue] = useState('');
    const [ suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const autocompleteRef = useRef();

    useEffect(() => {
        const handleClick = (event) => { // Clicks outside of area disable suggestions from showing
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target))
            setShowSuggestions(false);
        }

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    },)

    return (
        <div id={set_id} ref={autocompleteRef}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => {
                        onChangeFunc(e, setSuggestions, setShowSuggestions);
                        setValue(e.target.value)}}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => (e.key === 'Enter') && e.preventDefault()}
                    maxLength={255}
                />
            </Form>
            {searchResults(showSuggestions, suggestions, setShowSuggestions, value)}
        </div>
    );
  }
  
  export default Search;