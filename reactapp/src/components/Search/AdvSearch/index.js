import '../search.css'; // use same styling for consistency
import  '../../globals.css';
import './advsearch.css';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useState, useRef, useCallback } from 'react';
import RecipeCard from '../../RecipeCard';
import { useSearchParams, } from 'react-router-dom';
import {UserContext} from '../../../App.js';
import { SearchContext } from '../../../App.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function AdvSearch(placehold_text, set_id) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw

    // Infinite paging help from:
    // https://www.youtube.com/watch?v=NZKUirTtxcg
    const [ moreResults, setMoreResults ] = useState(true);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchQ, setSearchQ ] = useState(searchParams.get('query') || '');
    const { pageNum, setPageNum, suggestions, setSuggestions } = useContext(SearchContext);
    const { loading } = useContext(UserContext);
    const navigate = useNavigate();


    const cardNav = (id) => navigate('/viewrecipe/' + id);

    const onEnter = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    }

    const observer = useRef();
    const lastelemref = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && moreResults) {
                setPageNum(pageNum => pageNum + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, moreResults])

    useEffect(() => {
        setSuggestions([]);
    }, [searchQ, setSuggestions])

    useEffect(() => {
        const fetchData = async () => {
            const addFilter = (delim, filters) => {
                if (filters && filters.length > 0) return delim + filters.join(delim);
                return '';
            }
            setSearchQ(searchParams.get('query') || '');
            
            let diet_delim = "&diets=";
            let cuisine_delim = "&cuisine=";
            let time_delim = "&cookingtimetag=";
            let order_delim = "&ordering=";
            let diets = searchParams.getAll('diets');
            let cuisines = searchParams.getAll('cuisines');
            let timeTags = searchParams.getAll('timeTags');
            let ordering = searchParams.getAll('ordering');
            let searchCats = searchParams.getAll('searchCats');
    
            var searchReq = "http://127.0.0.1:8000/search/?page=" + pageNum + "&";
    
            let request = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
            }
    
            searchReq += "search=" + (searchParams.get('query') || '')
                    + addFilter(diet_delim, diets)
                    + addFilter(cuisine_delim, cuisines)
                    + addFilter(time_delim, timeTags)
                    + addFilter(order_delim, ordering);
            searchCats.forEach(cat => searchReq += ("&" + cat + "="));
            
            await fetch(searchReq, request)
            .then(async response => await response.json())
            .then(async data => {
                setMoreResults((data.next !== null));
                setSuggestions([...new Set([...suggestions, ...data.results])]);
            });
        }

        fetchData();

    }, [searchParams, pageNum, searchQ])

    const searchResult = (suggestion, index) => { // For a singular result (ie. 1 Card)
        // Singular Card - suggestion is a recipe
            const recipe_id = suggestion.recipe_details.id;
            if (suggestions.length === index + 1) {
                return <div key={recipe_id}
                            ref={lastelemref} 
                            data-aos='fade-left' 
                            data-aos-offset='0px'
                            className='advsearchcard'
                            onClick={() => cardNav(recipe_id)}>
                                {RecipeCard(suggestion)}
                            </div>;
            }
            else return <div key={suggestion.recipe_name}
                            data-aos='fade-left' 
                            data-aos-offset='0px'
                            className='advsearchcard'
                            onClick={() => cardNav(recipe_id)}>
                                {RecipeCard(suggestion)}
                            </div>;
        }
        
    const searchResults = () => { 
    // All cards - <suggestions> contain multiple cards that may be paginated
        return (<div id={'advresult_cards'}>{suggestions.map((suggestion, index) => {
                    return searchResult(suggestion, index)})}</div>);
    }  

    return (
        <div id={set_id}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => {
                        setSearchQ(e.target.value);
                        setSearchParams({
                            query: e.target.value
                        });
                        setPageNum(1);
                        setSuggestions([]);
                    }}
                    onKeyDown={onEnter}
                    value={searchQ}
                    maxLength={255}
                />
            </Form>
                {searchResults()}
        </div>
    );
  }
  
  export default AdvSearch;