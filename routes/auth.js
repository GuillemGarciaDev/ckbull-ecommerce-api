var express = require('express');
const generateAuthHeaders = require('../utils/authenticate');
const { default: axios } = require('axios');
var router = express.Router();

/* GET sign-in-request. */
router.get('/login',  async function(req, res, next) {
  const { apiKeyHeader, timestampHeader, signatureHeader } = generateAuthHeaders();

  const response = await axios.post(`${process.env.API_URL}/api/sign-in-requests`, {
    "x-api-key": apiKeyHeader,
    "x-signature": signatureHeader,
    "x-timestamp": timestampHeader,
  })
  res.send(response.data)
});

/* GET Polling: sign-in-request status. */
router.get('/login/:id', async function(req, res, next) {

  const response = await axios.get(`${process.env.API_URL}/api/sign-in-requests/${req.params.id}/status`)
  res.send(response.data)
});

module.exports = router;
