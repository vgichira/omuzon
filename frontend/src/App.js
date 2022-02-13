import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const App = () => {
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
