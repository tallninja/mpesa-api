const { StatusCodes: Sc } = require('http-status-codes');

const daraja = require('../apis/daraja');
const { consumerKey, consumerSecret } = require('../../config');

const encodedString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
	'base64'
);

const authString = `Basic ${encodedString}`;

module.exports = async (req, res, next) => {
	try {
		const res = await daraja.get('/oauth/v1/generate', {
			params: {
				grant_type: 'client_credentials',
			},
			headers: {
				Authorization: authString,
			},
		});

		req.token = res.data.access_token;
		next();
	} catch (err) {
		console.log('Error:', err);
		return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
	}
};
