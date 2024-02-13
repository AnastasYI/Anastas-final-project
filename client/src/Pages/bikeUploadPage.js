import React, { useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const BikeUploadPage = () => {
	const [user] = UserContext();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('Select a category');
	const [price, setPrice] = useState('');
	const [images, setImages] = useState([]);
	const [nameError, setNameError] = useState('');
	const [descriptionError, setDescriptionError] = useState('');
	const [categoryError, setCategoryError] = useState('');
	const [priceError, setPriceError] = useState('');
	const [imageError, setImageError] = useState('');

	const navigate = useNavigate();

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
	};

	const handlePriceChange = (event) => {
		setPrice(event.target.value);
	};

	const handleImageChange = (event) => {
		const selectedImages = Array.from(event.target.files);
		setImageError('');
		for (const image of selectedImages) {
			if (!['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
				setImageError('Only JPEG, PNG, and GIF files are allowed.');
				return;
			}
			if (image.size > 5000000) {
				// 5MB
				setImageError('Image size should be less than 5MB.');
				return;
			}
		}
		setImages(selectedImages);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setNameError('');
		setDescriptionError('');
		setCategoryError('');
		setPriceError('');
		setImageError('');

		let isValid = true;
		if (!name.trim()) {
			setNameError('Please enter a bike name.');
			isValid = false;
		}
		if (!description.trim()) {
			setDescriptionError('Please enter a description.');
			isValid = false;
		}
		if (category === 'Select a category' || !category) {
			setCategoryError('Please select a category.');
			isValid = false;
		}
		if (!price || price <= 0) {
			setPriceError('Please enter a valid price.');
			isValid = false;
		}
		if (images.length === 0) {
			setImageError('Please select at least one image.');
			isValid = false;
		}

		if (!isValid) return;

		const formData = new FormData();
		formData.append('user', JSON.stringify(user));
		formData.append('name', name);
		formData.append('description', description);
		formData.append('category', category);
		formData.append('price', price);
		images.forEach((image) => formData.append('images', image));

		try {
			const response = await fetch('/uploadBike', {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				console.log('Bike uploaded successfully:', data);
				navigate('/profile'); // Redirect to the ProfilePage
			} else {
				console.error('Upload failed:', data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Label>
					Name:
					<Input type='text' value={name} onChange={handleNameChange} />
					{nameError && <ErrorMessage>{nameError}</ErrorMessage>}
				</Label>
				<Label>
					Description:
					<Textarea value={description} onChange={handleDescriptionChange} />
					{descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}
				</Label>
				<Label>
					Category:
					<Select value={category} onChange={handleCategoryChange}>
						<option value='Select a category'>Select a category</option>
						<option value='Road Bikes'>Road Bikes</option>
						<option value='Mountain Bikes'>Mountain Bikes</option>
						<option value='Track Bikes'>Track Bikes</option>
						<option value='Components'>Components</option>
						<option value='Other'>Other</option>
					</Select>
					{categoryError && <ErrorMessage>{categoryError}</ErrorMessage>}
				</Label>
				<Label>
					Price:
					<Input type='number' value={price} onChange={handlePriceChange} />
					{priceError && <ErrorMessage>{priceError}</ErrorMessage>}
				</Label>
				<Label>
					Images:
					<Input type='file' multiple onChange={handleImageChange} />
					{imageError && <ErrorMessage>{imageError}</ErrorMessage>}
				</Label>
				<Button type='submit'>Upload</Button>
			</Form>
		</Container>
	);
};

const Container = styled.div``;

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Select = styled.select``;

const Button = styled.button``;

const ErrorMessage = styled.div`
	color: red;
	margin-top: 5px;
`;

export default BikeUploadPage;
