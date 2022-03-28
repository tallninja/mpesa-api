const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const daraja = require('../apis/daraja');
const { StatusCodes: Sc } = require('http-status-codes');

const getAccessToken = require('../middlewares/getAccessToken');

router.get('/mpesa/accesstoken', [getAccessToken], async (req, res) => {
	return res.status(Sc.OK).json({ token: req.token });
});

router.post('/validation', (req, res) => {
	console.log(req.body);
	return res.status(Sc.OK).end();
});

router.post('/confirmation', (req, res) => {
	console.log(req.body);
	return res.status(Sc.OK).end();
});

router.get('/mpesa/register-url', [getAccessToken], async (req, res) => {
	const ltUrl = fs.readFileSync(
		path.join(__dirname.split('/').slice(0, -2).join('/'), 'url.txt'),
		'utf8'
	);
	try {
		const registerUrlResponse = await daraja.post(
			'/mpesa/c2b/v1/registerurl',
			req.body,
			{
				headers: {
					Authorization: `Bearer ${req.token}`,
				},
			}
		);
		return res.status(Sc.OK).json(registerUrlResponse.data);
	} catch (error) {
		console.log('Error:', error);
		return res.status(Sc.INTERNAL_SERVER_ERROR).send({ err: error });
	}
});

router.post('/mpesa/c2b', [getAccessToken], async (req, res) => {
	try {
		const response = await daraja.post('/mpesa/c2b/v1/simulate', req.body, {
			headers: {
				Authorization: `Bearer ${req.token}`,
				ContentType: 'application/json',
			},
		});

		res.status(Sc.OK).json(response.data);
	} catch (error) {
		res.send(error);
		console.log(error);
	}
});

router.post('/validation', (req, res) => {
	console.log(req.body);

	if (req.body?.TransAmount < 100) {
		return res.status(Sc.OK).json({
			ResultCode: 'C2B00013', // Invalid Amount
			ResultDesc: 'Rejected',
		});
	}

	return res.status(Sc.OK).json({
		ResultCode: 0,
		ResultDesc: 'Accepted',
	});
});

router.post('/confirmation', (req, res) => {
	console.log(req.body);
	return res.status(Sc.OK).send({ success: true });
});

module.exports = router;
