import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
const primaryColor = '#1a936f'; // A relaxing green
const secondaryColor = '#114b5f'; // A deep blue

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(email);
		const response = await fetch('/user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		if (response.status === 200) {
			console.log(data);
			login(data);
			navigate('/');
		} else {
			// Handle login error
			console.error('Login failed:', data.message);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<Title>Login</Title>
			<Input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button type='submit'>Login</Button>
		</form>
	);
};
const Input = styled.input`
	padding: 15px;
	margin: 0px 5px 20px 0px;
	border: none;
	border-radius: 4px;
	background-color: #333;
	color: #fff;

	::placeholder {
		color: #777;
	}

	@media (max-width: 768px) {
		padding: 12px;
	}
`;

const Button = styled.button`
	background-color: ${secondaryColor}; /* Primary green color */
	color: white;
	padding: 15px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;

	:hover {
		background-color: ${primaryColor}; /* Secondary blue color on hover */
	}

	@media (max-width: 768px) {
		padding: 12px 15px;
	}
`;

const Title = styled.h2`
	font-family: 'Roboto Slab', serif; /* Using Roboto Slab */
	color: #fff;
	font-size: 28px; /* Slightly larger font size */
	font-weight: 700; /* Bold font weight */
	margin-bottom: 30px;
	text-align: center;
`;

export default LoginComponent;
