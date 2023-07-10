import './shoppinglist.css';
import  '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import ShoppingList from '../../components/ShoppingList';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';

function MyShoppingList() {

    const location = useLocation();
    const { setSuggestions, setPageNum } = useContext(SearchContext);

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);
    

    return (localStorage.getItem('access') ?
        (<AnimatePage >
            <div id='shop_page_container'>
                <ShoppingList/>
            </div>
        </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
    );
  }
  
  export default MyShoppingList;