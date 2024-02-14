import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SingleBikePage = () => {
	const location = useLocation();
	const bikeData = location.state?.bikeData;

	if (!bikeData) {
		return <div>No Bike Data Found</div>;
	}

	const { user, name, description, category, price, images } = bikeData;

	return (
		<BikeContainer>
			<BikeName>{name}</BikeName>
			<BikeCategory>Category: {category}</BikeCategory>
			<BikeDescription>{description}</BikeDescription>
			<BikeImages>
				{images.map((imageUrl, index) => (
					<img key={index} src={imageUrl} alt={`Bike ${index}`} />
				))}
			</BikeImages>
			<BikePrice>Price: ${price}</BikePrice>
			<BikeUser>Posted by: {user}</BikeUser>
		</BikeContainer>
	);
};

const BikeContainer = styled.div`
	padding: 20px;
	background-color: #f5f5f7;
	border-radius: 10px;
	margin: 20px auto;
	max-width: 600px;
`;

const BikeName = styled.h2`
	color: #333;
`;

const BikeCategory = styled.p`
	color: #666;
`;

const BikeDescription = styled.p`
	color: #333;
`;

const BikeImages = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 20px;

	img {
		width: 100%;
		max-width: 200px;
		height: auto;
		border-radius: 5px;
	}
`;

const BikePrice = styled.p`
	color: #333;
	font-weight: bold;
`;

const BikeUser = styled.p`
	color: #333;
`;

export default SingleBikePage;
