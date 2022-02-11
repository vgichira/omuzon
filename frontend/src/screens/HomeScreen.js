import { useEffect, useState } from 'react';
import { Link }from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');

            setProducts(data);
        }

        fetchProducts();
    }, [])

    return (
        <>
            <h1>Featured Products</h1>
            <div className="products">
            {
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
            }
            </div>
        </>
    )
}

export default HomeScreen;