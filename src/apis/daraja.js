const axios = require('axios').default;

module.exports = axios.create({
	baseURL: 'https://sandbox.safaricom.co.ke',
});
