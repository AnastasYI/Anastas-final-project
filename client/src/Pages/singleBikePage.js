import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SingleBikePage = () => {
	const location = useLocation();
	const { bikeData } = location.state || {};

	if (!bikeData) {
		return <div>No Bike Data Available</div>;
	}

	const { user, name, description, category, price, images } = bikeData;

	return (
		<div>
			<h1>{name}</h1>
			<p>Posted by: {user}</p>
			<p>Description: {description}</p>
			<p>Category: {category}</p>
			<p>Price: {price}</p>
			<div>
				{images.map((imageUrl, index) => (
					<img key={index} src={imageUrl} alt={`Bike ${index + 1}`} />
				))}
			</div>
		</div>
	);
};

export default SingleBikePage;
