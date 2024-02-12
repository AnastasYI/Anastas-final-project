const { MongoClient } = require('mongodb');
const sharp = require('sharp');
const cloudinary = require('../cloudinaryConfig');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const MONGO_URI = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const isValidImageMIMEType = (mimeType) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
	return allowedTypes.includes(mimeType);
};

const validateImageWithSharp = async (buffer) => {
	try {
		await sharp(buffer).metadata();
		return true;
	} catch (error) {
		return false;
	}
};

const uploadBike = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	const { user, name, description, category, price } = req.body;
	const images = req.files; // Assuming Multer is used to handle file uploads

	try {
		await client.connect();
		const db = client.db('LastProject');

		if (!name || !description || !category || !price) {
			return res.status(400).send('Missing required bike information.');
		}

		const imageUrls = [];
		for (const image of images) {
			if (!isValidImageMIMEType(image.mimetype)) {
				console.error('Invalid image file detected:', image.originalname);
				continue;
			}

			const isValidImage = await validateImageWithSharp(image.buffer);
			if (!isValidImage) {
				console.error('Invalid image file detected:', image.originalname);
				continue;
			}

			const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString(
				'base64'
			)}`;
			const result = await cloudinary.uploader.upload(dataUrl, {
				resource_type: 'image',
			});
			imageUrls.push(result.url);
		}

		if (imageUrls.length === 0) {
			return res.status(400).send('At least one valid image is required.');
		}

		const bikeData = {
			user: user.username,
			name,
			description,
			category,
			price,
			images: imageUrls,
		};
		const bikeResult = await db.collection('Bikes').insertOne(bikeData);

		if (bikeResult.insertedId) {
			await db.collection('User').updateOne(
				{ email: user.email }, // Use user.email to reference the user document
				{ $push: { bikes: bikeData } }
			);

			res.status(201).json({
				status: 201,
				data: bikeResult.insertedId,
				message: 'Bike added',
			});
		} else {
			res
				.status(404)
				.json({ status: 404, data: req.body, message: 'Bike not added' });
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Error processing request.');
	} finally {
		client.close();
	}
};

const getBikes = async (req, res) => {
	// returns items filtered based on params category
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('LastProject');

		let result;
		if (req.query) {
			const { category } = req.query;

			let query = {};
			if (category) {
				query.category = { $regex: category };
			}

			result = await db.collection('Bikes').find(query).toArray();
		} else {
			result = await db.collection('Bikes').find().toArray();
		}

		result
			? res.status(200).json({ status: 200, data: result })
			: res.status(404).json({ status: 404, data: 'Not Found' });
	} catch (error) {
		console.log(error);
	} finally {
		client.close();
	}
};
module.exports = { getBikes, upload, uploadBike };
