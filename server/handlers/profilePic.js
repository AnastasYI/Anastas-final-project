const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('../cloudinaryConfig');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const upload = multer({ storage: multer.memoryStorage() });

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

const uploadProfilePic = async (req, res) => {
	const MONGO_URI = process.env.MONGO_URI;

	const options = { useNewUrlParser: true, useUnifiedTopology: true };

	try {
		const { email, profilePic } = req.body;
		if (!profilePic) return res.status(400).send('No file uploaded.');

		if (!isValidImageMIMEType(profilePic.mimetype)) {
			return res
				.status(400)
				.send('Invalid file type. Only image files are allowed.');
		}

		const isValidImage = await validateImageWithSharp(profilePic.buffer);
		if (!isValidImage) {
			return res.status(400).send('Invalid image file.');
		}

		const dataUrl = `data:${
			profilePic.mimetype
		};base64,${profilePic.buffer.toString('base64')}`;
		const result = await cloudinary.uploader.upload(profilePic, {
			resource_type: 'image',
		});

		const client = new MongoClient(MONGO_URI, options);
		await client.connect();
		const db = client.db('LastProject');
		await db
			.collection('User')
			.updateOne({ email: email }, { $set: { profilePic: result.url } });
		client.close();

		res.json({ success: true, url: result.url });
	} catch (error) {
		console.error('Upload error:', error);
		res.status(500).send('Error uploading image.');
	} finally {
		client.close();
	}
};

module.exports = { upload, uploadProfilePic };
