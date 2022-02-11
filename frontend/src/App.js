import data from "./utils/data";

const App = () => {
  return (
	<div>
		<header className="App-header">
			<a href="/">omuzon</a>
		</header>
		<main>
			<h1>Featured Products</h1>
			<div className="products">
			{
				data.products.map(product => (
					<div className="product" key={product.slug}>
						<a href={`/product/${product.slug}`}>
							<img src={product.image} alt={product.name} />
						</a>
						<div className="product-info">
							<a href={`/product/${product.slug}`}>
								<p>{product.name}</p>
							</a>
							<p><strong>KES {product.price}</strong></p>
							<button>Add to Cart</button>
						</div>
					</div>
				))
			}
			</div>
		</main>
	</div>
  );
}

export default App;
