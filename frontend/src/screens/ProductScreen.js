import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Rating from '../components/Rating';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../context/store';

const initialState = {
    loading: false,
    error: '',
    product: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case 'FETCH_FAIL':
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        default:
            return state;
    }
}

const ProductScreen = () => {
    const { slug } = useParams();
    const [{ loading, product, error }, dispatch] = useReducer(reducer, initialState);
    const { dispatch: ctxDispatch } = useContext(Store);

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch({
                type: 'FETCH_REQUEST'
            })

            try {
                const { data } = await axios.get(`/api/product/${slug}`)

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: data
                })
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err)
                })
            }
        }

        fetchProduct();
    }, [slug]);

    const addToCart = () => {
        ctxDispatch({
            type: 'ADD_TO_CART', 
            payload: product, 
        })
    }

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <>
            <Helmet>
                <title>{product?.name}</title>
            </Helmet>
            <Row>
                <Col md={6}>
                    <img 
                        className='img-large' 
                        src={product?.image} 
                        alt={product?.name} 
                    />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h1>{product?.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating numReviews={product?.numReviews} rating={product?.rating} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: KES {product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Description: {product?.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>KES {product?.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                    {product?.countInStock > 0 ? (
                                        <Badge bg="success">In Stock</Badge>
                                    ) : (
                                        <Badge bg="danger">Out of stock</Badge>
                                    )
                                    }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {
                            product?.countInStock > 0 && (
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button onClick={addToCart} variant="primary">Add to Cart</Button>
                                    </div>
                                </ListGroup.Item>
                            )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;