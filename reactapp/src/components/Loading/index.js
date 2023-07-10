import Spinner from 'react-bootstrap/Spinner';
import './loadingcomp.css'

function LoadingComp() {
    return (
        <div id='loading_container'>
            <Spinner animation="border" role="status" id='load_spinner' variant='warning'/>
        </div>
    )
}

export default LoadingComp;