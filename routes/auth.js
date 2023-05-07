var express = require('express');
const generateAuthHeaders = require('../utils/authenticate');
const { default: axios } = require('axios');
var router = express.Router();

/* GET sign-in-request. */
router.get('/login',  async function(req, res, next) {
  const { apiKeyHeader, timestampHeader, signatureHeader } = generateAuthHeaders();
    const headers = {
      "x-api-key": apiKeyHeader,
      "x-signature": signatureHeader,
      "x-timestamp": timestampHeader,
  }

  try {
    const response = await axios.post(`${process.env.CKBULL_SIGNER_API}/api/sign-in-requests`, {}, { headers })
    console.log(response.data);
    res.send(response.data)
  }
  catch (error) {
    console.log(error);
  }
});

/* GET Polling: sign-in-request status. */
router.get('/login/:id', async function(req, res, next) {

  const response = await axios.get(`${process.env.CKBULL_SIGNER_API}/api/sign-in-requests/${req.params.id}/status`)
  console.log(response.data);
  res.send(response.data)
});

module.exports = router;
