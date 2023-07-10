import Checkbox from "./Checkbox";
import './advbox.css';
import { useState } from "react";

function AdvBox (filter_title, filters_box, filters,
                 tags, query_cat, desc_text, type) {

    const [ isActive, setIsActive ] = useState(false);

    return (
        <div className='adv_filter_col'>
            <h4>{filter_title}</h4>
            <div id={filters_box}>
                {filters.map((filter, index) => (
                    <div key={filter + index}>
                        {Checkbox(filter, tags[index], query_cat, type, isActive, setIsActive, index)}
                    </div>
                ))}
                {desc_text && <span className='filters_desc'><p>< br/>{desc_text}</p></span>}
            </div>
        </div>
    );
}

export default AdvBox;