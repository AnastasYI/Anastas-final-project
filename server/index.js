const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;
const {
	getUser,
	createUser,
	getBikes,
	uploadBike,
	uploadProfilePic,
	upload,
} = require('./allHandlersExport');

app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Methods',
		'OPTIONS, HEAD, GET, PUT, POST, DELETE'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/bacon', (req, res) => res.status(200).json({ data: '🥓' }));
app.post('/user', getUser);
app.get('/bikes', getBikes);
app.post('/createUser', createUser);
app.post('/uploadBike', upload.array('images', 5), uploadBike);
app.post('/uploadProfilePic', upload.single('image'), uploadProfilePic);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
