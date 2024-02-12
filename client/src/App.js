import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import { useEffect } from 'react';
import LogInPage from './Pages/LogInPage';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
import BikeUploadPage from './Pages/bikeUploadPage';
import { UserProvider } from './UserContext';
const App = () => {
	useEffect(() => {
		fetch('/bacon')
			.then((res) => res.json())
			.then((data) => console.log(data.data));
	}, []);
	return (
		<UserProvider>
			<Router>
				<ConditionalNavBar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/LogIn' element={<LogInPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/bikeUpload' element={<BikeUploadPage />} />
				</Routes>
			</Router>
		</UserProvider>
	);
};
const ConditionalNavBar = () => {
	const location = useLocation();

	// Hide NavBar on LogInPage
	if (location.pathname === '/LogIn') {
		return null;
	}

	return <NavBar />;
};

export default App;
