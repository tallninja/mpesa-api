const router = require('express').Router();
const { default: axios } = require('axios');

const { fetchAccessToken } = require('./apis/mpesa');

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success reached server successfully !',
    url: req.url,
  });
});

app.get('/mpesa/register-url', async (req, res) => {
  const ngrokUrl = 'http://c860ca78557f.ngrok.io';
  const accessToken = await fetchAccessToken();
  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
      {
        ValidationURL: `${ngrokUrl}/validation`,
        ConfirmationURL: `${ngrokUrl}/confirmation`,
        ResponseType: 'Cancelled',
        ShortCode: 174379,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Server error !' });
    console.error(error);
  }
});

app.get('/mpesa/c2b', async (req, res) => {
  try {
    const accessToken = await fetchAccessToken();
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
      {
        CommandID: 'CustomerPayBillOnline',
        Amount: 100,
        Msisdn: 254708374149,
        BillRefNumber: 600000,
        ShortCode: 174379,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

app.post('/validation', (req, res) => {
  console.log(req.body);
  res.status(200).send({});
});

app.post('/confirmation', (req, res) => {
  console.log(req.body);
  res.status(200).send({});
});

module.exports = router;
