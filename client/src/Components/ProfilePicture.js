import React from 'react';
import styled from 'styled-components';

const ProfilePicture = ({ profilePictureUrl, onPictureChange }) => {
	return (
		<ProfilePicContainer>
			<ProfilePicImage src={profilePictureUrl} alt='Profile' />
			<ChangePictureLabel htmlFor='profile-upload'>
				Change Picture
			</ChangePictureLabel>
			<input
				type='file'
				id='profile-upload'
				style={{ display: 'none' }}
				onChange={onPictureChange}
			/>
		</ProfilePicContainer>
	);
};

// Styled components
const ProfilePicContainer = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	border: 3px solid #114b5f;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f0f0f0;
	margin: 0 auto;
	position: relative;
	overflow: hidden;

	&:hover > label {
		display: flex;
	}
`;

const ProfilePicImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const ChangePictureLabel = styled.label`
	display: none;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); /* Centering the label */
	width: 80%; /* Adjust the width as needed */
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	justify-content: center;
	align-items: center;
	padding: 5px 0;
	cursor: pointer;
	text-align: center; /* Ensure text is centered */
	border-radius: 20px; /* Optional: Rounded corners for the label */
`;
export default ProfilePicture;
