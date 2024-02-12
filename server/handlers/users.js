require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { MONGO_URI } = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const { MongoClient } = require('mongodb');
const getUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	const { email, password } = req.body;
	try {
		await client.connect();
		const db = client.db('LastProject');
		const user = await db.collection('User').findOne({ email: email });
		if (user) {
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				res.status(200).json({
					status: 200,
					data: user,
					message: `user ${email} logged in`,
				});
			} else {
				res.status(401).json({ status: 401, message: 'Incorrect password' });
			}
		} else {
			res.status(404).json({ status: 404, message: `e-mail not found` });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: 500, data: req.body, message: error });
	} finally {
		client.close();
	}
};

const createUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	const { email, username, password } = req.body;
	try {
		await client.connect();
		const db = client.db('LastProject');
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		if (_id.length && username.length && password.length) {
			const result = await db.collection(`User`).insertOne({
				email: email,
				username: username,
				password: hashedPassword,
				profilePic: '',
				bikes: [],
			});
			result.insertedId
				? res
						.status(201)
						.json({ status: 201, data: _id, message: `User ${_id} created` })
				: res.status(404).json({
						status: 404,
						data: req.body,
						message: `Missing informations`,
				  });
		} else {
			res
				.status(404)
				.json({ status: 404, data: req.body, message: `Missing informations` });
		}
	} catch (error) {
		console.log(error);
		if (error.code === 11000) {
			// duplicate key
			res.status(404).json({
				status: 404,
				data: _id,
				message: ` ${_id} already in use for a profile`,
			});
		} else {
			res.status(500).json({ status: 500, data: req.body, message: error });
		}
	} finally {
		client.close();
	}
};
module.exports = { getUser, createUser };
