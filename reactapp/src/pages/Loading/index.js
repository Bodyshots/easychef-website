import './loading.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {

    return (
        <AnimatePage>
            <Container id='loading_container_page'>
                <h1 id='loading_title'>Loading...</h1>
                <Spinner animation="border" role="status" id='load_page_spinner'/>
                <h4 id='loading_subtitle'>Please wait</h4>
            </Container>
        </AnimatePage>
    );
}

export default Loading;