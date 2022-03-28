const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const lt = require('localtunnel');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);

app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server Listening on PORT: ${PORT}`);

		// (async () => {
		// 	try {
		// 		const tunnel = await lt({ port: PORT });
		// 		fs.writeFileSync('url.txt', tunnel.url);
		// 		console.log(`Tunnel URL: ${tunnel.url}`);
		// 		tunnel.on('close', () => {
		// 			console.log('Tunnel closed');
		// 		});
		// 	} catch (err) {
		// 		console.log('Error:', err);
		// 	}
		// })();
	}
});
