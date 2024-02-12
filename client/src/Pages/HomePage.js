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
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setUploads(res.data);
				setIsLoading(false);
			});
		setFilteredUploads(uploads);
	}, [uploads]);

	const handleCategorySelect = (category) => {
		if (category === 'All') {
			setFilteredUploads(uploads);
		} else {
			const filtered = uploads.filter((upload) => upload.category === category);
			setFilteredUploads(filtered);
		}
	};

	return (
		<HomeContainer>
			<SortOptions onCategorySelect={handleCategorySelect} />
			<BikesGrid uploads={filteredUploads} />
		</HomeContainer>
	);
};

const HomeContainer = styled.div``;

export default HomePage;
