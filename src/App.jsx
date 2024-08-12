import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route
						path='/'
						element={<LoginPage />}
					/>
					<Route
						path='/home'
						element={<HomePage />}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}
export default App;
