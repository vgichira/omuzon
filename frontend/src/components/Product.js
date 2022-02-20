import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from 'axios';
import { useContext } from "react";
import { Store } from "../context/store";

const Product = ({ product }) => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const addToCartHandler = async (item) => {
        const { cart } = state;
        const productExists = cart.cartItems.find(cartItem => cartItem._id === product._id);
        const quantity = productExists ? productExists.quantity + 1 : 1

        const { data } = await axios.get(`/api/products/${item._id}`)

        if(data.countInStock < quantity){
            window.alert('Sorry, product out of stock')
            return
        }

        ctxDispatch({
            type: 'ADD_TO_CART', 
            payload: { ...item, quantity }, 
        })
    }
    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>KES {product.price}</Card.Text>
                {product.countInStock === 0 ? (
                <Button 
                variant="light"
                disabled
                >
                    Out of Stock
                </Button>
                ) : (
                <Button 
                variant="warning"
                onClick={() => addToCartHandler(product)}
                >
                    Add to Cart
                </Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default Product;