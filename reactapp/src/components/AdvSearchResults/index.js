import './advsearchresults.css';
import AdvSearch from '../Search/AdvSearch';

function AdvSearchResults () {
    return (
    <div className="search_wrap">
        <div id='main_search' data-aos='fade-down' data-aos-offset='0px'>
            <h2 id="advanced_search_title"><b>Search</b></h2>
            {AdvSearch('What are you looking for?', 'adv_search_sec')}
        </div>
    </div>
    );
}

export default AdvSearchResults;