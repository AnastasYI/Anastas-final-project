import React from 'react';
import styled from 'styled-components';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
const LogInPage = () => {
	return (
		<PageContainer>
			<FormContainer>
				<LoginComponent />
				<SignUpComponent />
			</FormContainer>
		</PageContainer>
	);
};
const PageContainer = styled.div`
	background-image: url('path-to-your-bicycle-background.jpg'); /* Replace with your image path */
	background-size: cover;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;

	@media (max-width: 768px) {
		align-items: flex-start;
		padding-top: 60px;
	}
`;

const FormContainer = styled.div`
	background-color: rgba(
		0,
		0,
		0,
		0.85
	); /* Slightly more opaque for readability */
	padding: 40px 60px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	max-width: 375px; /* Slightly wider than before */

	@media (max-width: 768px) {
		padding: 30px 40px;
	}
`;

export default LogInPage;
