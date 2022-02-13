import Spinner from 'react-bootstrap/Spinner';

const LoadingBox = () => (
    <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
)

export default LoadingBox;