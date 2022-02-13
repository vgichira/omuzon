import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';

const initialState = {
    loading: false, 
    error: "", 
    products: []
}

const reducer = (state = initialState, action) => {
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
                products: action.payload
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

const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), initialState);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({
                type: 'FETCH_REQUEST'
            })
    
            try {
                const { data } = await axios.get('/api/products');

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: data,
                })
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: err.message
                })
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            <Helmet>
                <title>Omuzon :: Home</title>
            </Helmet>
            <h1>Featured Products</h1>
            <div className="products">
            {
                loading ? (
                    <div>Loading...</div>
                )
                : error ? (
                    <div>{error}</div>
                )
                : (
                    <Row>
                    {
                        products.map(product => (
                            <Col key={product.slug} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    }
                    </Row>
                )
            }
            </div>
        </>
    )
}

export default HomeScreen;