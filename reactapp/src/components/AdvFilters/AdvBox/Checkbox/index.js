import { useState } from "react";
import './checkbox.css';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../../../App";

function Checkbox (filter, tag, query_cat, type, isActive, setIsActive, index) {
    const { setPageNum, setSuggestions} = useContext(SearchContext);
    const [checked, setChecked] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const checkbox = 'checkbox';
    const radio = 'radio';

    useEffect(() => {
        if (searchParams.getAll(query_cat).some(item => item === tag)) setChecked(true);
        else setChecked(false);
    }, [searchParams])

    const addTag = (tag) => {
        if (type === checkbox) {
            let updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.append(query_cat, tag);
            setSearchParams(updatedSearchParams.toString());
        }
        else if (type === radio) {
            let updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.delete(query_cat);
            updatedSearchParams.append(query_cat, tag);
            setSearchParams(updatedSearchParams.toString());
        }
    }

    const removeTag = (tag) => {
        // Code from:
        // https://stackoverflow.com/questions/61685743/react-router-update-only-one-query-parameter-instead-of-replacing-all
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        const tags = updatedSearchParams.getAll(query_cat).filter(queryTag => queryTag !== tag);
        updatedSearchParams.delete(query_cat);
        for (const tag of tags) updatedSearchParams.append(query_cat, tag);
        setSearchParams(updatedSearchParams.toString());
    }

    const onToggle = () => {
        setChecked(!checked) // wont update immediately
        setPageNum(1);
        setSuggestions([]);
        setIsActive(index);
        if (!checked) addTag(tag); // If checked
        else removeTag(tag); // If unchecked
    }

    return (
        <label>
        <input id={filter + "_" + tag}
                type={type}
                className='searchcheck'
                checked={type === checkbox ? checked : (isActive === index && checked)}
                onClick={() => onToggle()}
                onChange={(e) => e.target.value}/>
        <span className='filtertext'>
                {filter}
        </span></label>
    );
}

export default Checkbox;