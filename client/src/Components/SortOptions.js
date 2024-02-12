import React from 'react';
import styled from 'styled-components';

const SortOptions = ({ onCategorySelect }) => {
	const categories = [
		'All',
		'Road Bikes',
		'Mountain Bikes',
		'Track Bikes',
		'Components',
		'Other',
	];

	return (
		<SortContainer>
			{categories.map((category) => (
				<SortButton key={category} onClick={() => onCategorySelect(category)}>
					{category}
				</SortButton>
			))}
		</SortContainer>
	);
};

const SortContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
`;

const SortButton = styled.button`
	margin: 0 10px;
	padding: 8px 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	cursor: pointer;
	background-color: white;
	/* Additional styling for buttons */
`;

export default SortOptions;
