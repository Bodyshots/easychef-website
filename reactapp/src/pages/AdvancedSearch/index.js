import './AdvancedSearch.css';
import './checkmarks.css';
import '../../components/globals.css';
import AdvFilters from '../../components/AdvFilters';
import AdvSearchResults from '../../components/AdvSearchResults';
import AnimatePage from '../../components/AnimatePage';

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AdvancedSearch () {

    useEffect(() => {
        AOS.init({ duration: 700 });
    }, []);

    return (
        <AnimatePage>
            <div id='adv_search_container'>
                <AdvFilters/>
                <AdvSearchResults/>
            </div>
        </AnimatePage>
    );
}

export default AdvancedSearch;
