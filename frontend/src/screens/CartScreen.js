import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../context/store";
import axios from 'axios';

const CartScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const navigate = useNavigate();
    const { cart: { cartItems }} = state;

    const updateCartHandler = async (item, quantity) => {
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

    const removeFromCartHandler = (item) => {
        ctxDispatch({
            type: 'REMOVE_FROM_CART', 
            payload: item
        })
    }

    const checkoutHandler = () => {
        navigate('/signup?redirect=/checkout')
    }
    return (
        <>
            <Helmet>
                <title>Cart Items</title>
            </Helmet>
            <Row>
                <Col md={8}>
                {cartItems.length === 0 ? (
                    <MessageBox>Cart is empty.<Link to="/"> Go shopping</Link></MessageBox>
                ) : (
                    <ListGroup>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img 
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded img-thumbnail"
                                        /> {' '}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button 
                                        variant="light" 
                                        disabled={item.quantity <= 1}
                                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                        <Button 
                                        variant="light" 
                                        disabled={item.quantity >= item.countInStock}
                                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                                        >
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>{`KES ${item.price}`}</Col>
                                    <Col md={2}>
                                        <Button 
                                        variant="light"
                                        onClick={() => removeFromCartHandler(item)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                                        KES {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                        type="button"
                                        variant="warning"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen;