const router = require('express').Router();
const axios = require('axios').default;
const { StatusCodes: Sc } = require('http-status-codes');

const { fetchAccessToken } = require('../apis/mpesa');

router.get('/mpesa/accesstoken', async (req, res) => {
  const accessToken = await fetchAccessToken();
  return res.status(Sc.OK).json({ token: accessToken });
});

router.post('/validation', (req, res) => {
  console.log(req.body);
  return res.status(Sc.OK).end();
});

router.post('/confirmation', (req, res) => {
  console.log(req.body);
  return res.status(Sc.OK).end();
});

router.get('/mpesa/register-url', async (req, res) => {
  const ngrokUrl = 'http://f5e7-41-90-190-49.ngrok.io';
  const accessToken = await fetchAccessToken();
  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
      {
        ValidationURL: `${ngrokUrl}/api/payments/validation`,
        ConfirmationURL: `${ngrokUrl}/api/payments/confirmation`,
        ResponseType: 'Canceled',
        ShortCode: '174379',
      },
      {
        headers: {
          Authorization: `Bearer ppSu2y5SaSAUJ4VzehDmRCQGMRBo`,
        },
      }
    );
    console.log(response.data);
    return;
  } catch (error) {
    console.log('Error:', error);
    return res.status(Sc.INTERNAL_SERVER_ERROR).send({ err: error });
  }
});

router.get('/mpesa/c2b', async (req, res) => {
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

router.post('/validation', (req, res) => {
  console.log(req.body);
  return res.status(Sc.OK).send({});
});

router.post('/confirmation', (req, res) => {
  console.log(req.body);
  return res.status(Sc.OK).send({});
});

module.exports = router;
