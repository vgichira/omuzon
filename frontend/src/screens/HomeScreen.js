import data from "../utils/data";
import { Link }from 'react-router-dom';

const HomeScreen = () => (
    <>
        <h1>Featured Products</h1>
        <div className="products">
        {
            data.products.map(product => (
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

export default HomeScreen;