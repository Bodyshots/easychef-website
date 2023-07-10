import '../search.css';
import './searchdropdown.css';
import  '../../globals.css';
import Search from '..';

function SearchDropdown(onChangeFunc, placehold_text, set_id,
                        showSuggestion) {

    const searchResults = (showSuggestions, suggestions, setShowSuggestions, value) => {
        return (<div id='searchresults'>
                {showSuggestions && (
                    <ul id='searchsuggestions'>
                        {suggestions.map(suggestion => (
                            showSuggestion(suggestion, setShowSuggestions, value)
                        ))}
                    </ul>
                )}
        </div>)
    }

    return (
        <>
            {Search(onChangeFunc, placehold_text, set_id, searchResults)}
        </>
    );
  }
  
  export default SearchDropdown;