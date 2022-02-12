import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => (
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
            <Button variant="warning">Add to Cart</Button>
        </Card.Body>
    </Card>
)

export default Product;