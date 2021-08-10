const { default: axios } = require("axios");
const { consumerKey, consumerSecret } = require("../config/keys");

const encodedString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
  "base64"
);
// const decodedString = Buffer.from(encodedString, "base64").toString("ascii");

const authString = `Basic ${encodedString}`;
var accessToken;

const fetchAccessToken = async () => {
  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate",
    {
      headers: {
        Authorization: authString,
      },
      params: {
        grant_type: "client_credentials",
      },
    }
  );

  return res.data.access_token;
};

module.exports = { fetchAccessToken };
