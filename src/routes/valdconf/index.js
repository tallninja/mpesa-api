const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'Yaaay working !' });
});

const URL = 'https://e7a5-41-90-177-134.ngrok.io/api/payments';

app.post('/validation', async (req, res) => {
	const response = await axios.post(`${URL}/validation`, req.body);
	return res.status(Sc.OK).json(response.data);
});

app.post('/confirmation', async (req, res) => {
	const response = await axios.post(`${URL}/confirmation`, req.body);
	return res.status(Sc.OK).json(response.data);
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server listening on PORT: ${PORT}`);
	}
});
