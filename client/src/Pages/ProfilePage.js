import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ProfilePicture from '../Components/ProfilePicture';
import { useNavigate } from 'react-router-dom'; // For navigation
import { UserContext } from '../UserContext'; // For accessing user data
const ProfilePage = () => {
	const { user, updateUser } = useContext(UserContext);
	const [profilePictureUrl, setProfilePictureUrl] = useState(user.profilePic);
	const handlePictureChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('profilePic', file);
		formData.append('email', user.email); // sending user's email

		try {
			const response = await fetch('/upload-profile-pic', {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				setProfilePictureUrl(data.url); // Update profile picture URL
				updateUser({ ...user, profilePic: data.url }); // Update user context
			} else {
				console.error('Upload failed:', data.message);
				// Handle upload error
			}
		} catch (error) {
			console.error('Error:', error);
			// Handle error
		}
	};

	const navigate = useNavigate();
	const navigateToBikeUpload = () => {
		navigate('/bikeUpload');
	};
	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`); // Navigate to individual post page
	};

	return (
		<ProfileContainer>
			<ProfileHeader>
				<ProfilePictureContainer>
					<ProfilePicture
						profilePictureUrl={profilePictureUrl}
						onPictureChange={handlePictureChange}
					/>
					<Username>{user.username}</Username>
				</ProfilePictureContainer>
			</ProfileHeader>
			<Button onClick={navigateToBikeUpload}>Upload Bike</Button>
			<YourPostsLabel>Your Posts</YourPostsLabel>
			<PostsGrid></PostsGrid>
			<YourCommentsLabel>Your Comments</YourCommentsLabel>
			<PostsGrid>
				{user.bikes.map((post) => (
					<PostItem key={post.name} onClick={() => handlePostClick(post.name)}>
						<PostImage src={post.images[0]} alt={`Post ${post.name}`} />
					</PostItem>
				))}
			</PostsGrid>
		</ProfileContainer>
	);
};

// Styled components
const ProfileContainer = styled.div`
	/* Style for the main profile container */
`;

const ProfileHeader = styled.div`
	text-align: center;
	margin-bottom: 20px;
`;

const ProfilePictureContainer = styled.div`
	display: inline-block;
`;

const Username = styled.h2`
	margin-top: 10px;
`;

const YourPostsLabel = styled.h3`
	margin-bottom: 10px;
`;

const PostsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 10px;
`;

const PostItem = styled.div`
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
`;

const PostImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const YourCommentsLabel = styled.h3`
	margin-top: 20px;
	margin-bottom: 10px;
`;
const Button = styled.button`
	background-color: #4caf50;
	margin-bottom: 20px;
`;
export default ProfilePage;
