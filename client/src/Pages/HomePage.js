import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SortOptions from '../Components/SortOptions';
import BikesGrid from '../Components/BikesGrid';

const HomePage = () => {
	const [uploads, setUploads] = useState([]);
	const [filteredUploads, setFilteredUploads] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});
	useEffect(() => {
		setIsLoading(true);
		let url = '/bikes';
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setUploads(res.data);
				setFilteredUploads(res.data);
				setIsLoading(false);
			});
	}, []);

	const handleCategorySelect = (category) => {
		if (!category || category === 'All') {
			setFilteredUploads(uploads);
		} else {
			const filtered = uploads.filter((upload) => upload.category === category);
			setFilteredUploads(filtered);
			console.log(filteredUploads);
		}
	};

	return (
		<HomeContainer>
			{isLoading && <p>Loading...</p>}
			<SortOptions onCategorySelect={handleCategorySelect} />
			<BikesGrid uploads={filteredUploads} />
		</HomeContainer>
	);
};

const HomeContainer = styled.div``;

export default HomePage;
