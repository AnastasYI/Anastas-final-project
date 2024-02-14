import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const BikeUploadPage = () => {
	const { user } = useContext(UserContext);
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
	const [imagePreviews, setImagePreviews] = useState([]);
	const { login } = useContext(UserContext);
	const [storedUser, setStoredUser] = useState(null);
	useEffect(() => {
		setStoredUser(localStorage.getItem('user'));
		if (storedUser) {
			login(JSON.parse(storedUser));
		}
	}, []);
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
		const newSelectedImages = Array.from(event.target.files);
		const totalImages = images.length + newSelectedImages.length;

		if (totalImages > 5) {
			setImageError('You can only upload a maximum of 5 images.');
			return;
		}

		setImageError('');

		const newImageUrls = newSelectedImages
			.map((image) => {
				if (!['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
					setImageError('Only JPEG, PNG, and GIF files are allowed.');
					return null;
				}
				if (image.size > 5000000) {
					// 5MB
					setImageError('Image size should be less than 5MB.');
					return null;
				}
				return URL.createObjectURL(image);
			})
			.filter((url) => url != null); // Filter out null values

		setImagePreviews([...imagePreviews, ...newImageUrls]);
		setImages([...images, ...newSelectedImages]);
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
		formData.append('user', storedUser);
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
					<ImagePreviewContainer>
						{imagePreviews.map((previewUrl, index) => (
							<img key={index} src={previewUrl} alt={`Preview ${index + 1}`} />
						))}
					</ImagePreviewContainer>
				</Label>
				<Button type='submit'>Upload</Button>
			</Form>
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh; // Ensures the container takes at least the full height of the viewport
	padding-top: 2%; // 20% padding at the top
	background-color: #f5f5f7;

	@media (max-width: 600px) {
		padding-top: 10%; // Maintains padding on smaller devices
	}
`;

const Form = styled.form`
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	background-color: white;
	width: 100%;
	max-width: 500px;

	@media (max-width: 600px) {
		max-width: 100%;
	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: 10px;
	color: #333;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
	border: 1px solid #d1d1d6;

	@media (max-width: 600px) {
		padding: 8px;
	}
`;

const Textarea = styled.textarea`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
	border: 1px solid #d1d1d6;
	resize: vertical;

	@media (max-width: 600px) {
		padding: 8px;
	}
`;

const Select = styled.select`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
	border: 1px solid #d1d1d6;

	@media (max-width: 600px) {
		padding: 8px;
	}
`;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	border: none;
	background-color: #a9a9a9; // Grey color
	color: white;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #a9a9a9cc; // Slightly transparent grey on hover
	}

	@media (max-width: 600px) {
		padding: 8px;
		font-size: 14px;
	}
`;
const ImagePreviewContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-bottom: 20px;

	img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 5px;
	}
`;
const ErrorMessage = styled.div`
	color: red;
	margin-bottom: 15px;
`;
export default BikeUploadPage;
