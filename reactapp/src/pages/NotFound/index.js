import './not_found.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';

function NotFound() {

    const { setSuggestions, setPageNum } = useContext(SearchContext);

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);

    return (
        <AnimatePage>
            <Container id='not_found_container'>
            <h1 id='not_found_title'>Page not found!</h1>
            <h4 id='not_found_subtitle'>Hmmm... Maybe try another page?</h4>
            </Container>
        </AnimatePage>
    );
}

export default NotFound;