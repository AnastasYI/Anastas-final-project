import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null); // State to hold the current user

	// Function to log in a user and update the state
	const login = (userData) => {
		setUser(userData);
	};

	// Function to log out a user and clear the state
	const logout = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
