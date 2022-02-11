import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
	<BrowserRouter>
		<div>
			<header className="App-header">
				<Link to="/">omuzon</Link>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path='/product/:slug' element={<ProductScreen />} />
				</Routes>
			</main>
		</div>
	</BrowserRouter>
  );
}

export default App;
