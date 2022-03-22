const { default: axios } = require('axios');
const { consumerKey, consumerSecret } = require('../../config');

const encodedString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
  'base64'
);
// const decodedString = Buffer.from(encodedString, "base64").toString("ascii");

const authString = `Basic ${encodedString}`;

exports.fetchAccessToken = async () => {
  const res = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate',
    {
      headers: {
        Authorization: authString,
      },
      params: {
        grant_type: 'client_credentials',
      },
    }
  );

  return res.data.access_token;
};
