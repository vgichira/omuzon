import { useEffect, useReducer } from 'react';
import { Link }from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

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
                    products.map(product => (
                        <div className="product" key={product.slug}>
                            <Link to={`/product/${product.slug}`}>
                                <img src={product.image} alt={product.name} />
                            </Link>
                            <div className="product-info">
                                <Link to={`/product/${product.slug}`}>
                                    <p>{product.name}</p>
                                </Link>
                                <p><strong>KES {product.price}</strong></p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    ))
                )
            }
            </div>
        </>
    )
}

export default HomeScreen;