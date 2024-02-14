import React, { createContext, useEffect, useState, useCallback } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = useCallback((userData) => {
		setUser(userData);
		console.log('User:', user, localStorage);
		localStorage.setItem('user', JSON.stringify(userData));
	}, []);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			login(JSON.parse(storedUser));
		}
	}, []);

	const logout = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
