import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BikesGrid = ({ uploads }) => {
	const navigate = useNavigate();

	const handleUploadClick = (uploadId) => {
		navigate(`/upload/${uploadId}`);
	};

	return (
		<Grid>
			{uploads.map((upload) => (
				<BikeItem key={upload.id} onClick={() => handleUploadClick(upload.id)}>
					<BikeImage src={upload.imageUrl} alt={upload.name} />
				</BikeItem>
			))}
		</Grid>
	);
};

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 10px;
`;

const BikeItem = styled.div`
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
`;

const BikeImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export default BikesGrid;
