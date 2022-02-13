import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './context/store';

const App = () => {
	const { state: { cart } } = useContext(Store);
	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header className="App-header">
					<Navbar bg='dark' variant='dark'>
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand>
									Omuzon
								</Navbar.Brand>
							</LinkContainer>
							<Nav className="me-auto">
								<Link to="/cart" className='nav-link'>
									Cart
									{cart.cartItems.length > 0 && (
										<Badge bg="danger" pill>
											{cart.cartItems.length}
										</Badge>
									)}
								</Link>
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main className='mt-3'>
					<Container>
						<Routes>
							<Route path="/" element={<HomeScreen />} />
							<Route path='/product/:slug' element={<ProductScreen />} />
						</Routes>
					</Container>
				</main>
				<footer>
					<div className="text-center">All rights reserved</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
