import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BikesGrid = ({ uploads }) => {
	const navigate = useNavigate();

	const handleBikeClick = (bikeData) => {
		navigate('/bike', { state: { bikeData } });
	};
	if (!uploads || uploads.length === 0) {
		return <div>No bikes to display</div>;
	}
	return (
		<Grid>
			{uploads.map((upload) => (
				<BikeItem key={upload.name} onClick={() => handleBikeClick(upload)}>
					<BikeName>{upload.name}</BikeName>
					<BikeImage src={upload.images[0]} alt={upload.name} />
				</BikeItem>
			))}
		</Grid>
	);
};

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap; // For responsiveness
	gap: 10px; // Added gap
`;

const BikeItem = styled.div`
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
	text-align: center; // Center the content
`;

const BikeImage = styled.img`
	width: 50vh; // Adjust to fit the container

	height: auto; // Maintain aspect ratio
`;

const BikeName = styled.h3`
	margin-top: 10px;
`;

export default BikesGrid;
