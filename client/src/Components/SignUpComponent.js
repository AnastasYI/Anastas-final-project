import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

const primaryColor = '#1a936f'; // A relaxing green
const secondaryColor = '#114b5f'; // A deep blue
const SignUpComponent = () => {
	const [newUsername, setNewUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { login } = useContext(UserContext); // Use UserContext

	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		const response = await fetch('/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: newEmail,
				username: newUsername,
				password: newPassword,
			}),
		});
		const data = await response.json();
		if (response.status === 201) {
			login(data.user); // Log in the user with the returned data

			console.log('User created and logged in:', data.message);
			navigate('/');
		} else {
			// Handle sign-up error
			console.error('Sign-up failed:', data.message);
		}
		// Handle the sign-up logic here
		console.log('Signing up:', newUsername, newPassword);
	};

	return (
		<form onSubmit={handleSignUp}>
			<Title>Sign Up</Title>
			<Input
				type='email'
				value={newEmail}
				onChange={(e) => setNewEmail(e.target.value)}
				placeholder='Email'
			/>
			<Input
				type='text'
				placeholder='Username'
				value={newUsername}
				onChange={(e) => setNewUsername(e.target.value)}
			/>
			<Input
				type='password'
				placeholder='Password'
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
			/>
			<Input
				type='password'
				placeholder='Confirm Password'
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>

			<Button type='submit'>Sign Up</Button>
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
	background-color: ${primaryColor}; /* Primary green color */
	color: white;
	padding: 15px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;

	:hover {
		background-color: ${secondaryColor}; /* Secondary blue color on hover */
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
export default SignUpComponent;
