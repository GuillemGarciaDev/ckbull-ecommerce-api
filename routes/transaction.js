const { default: axios } = require('axios');
const generateAuthHeaders = require('../utils/authenticate');
const convertCKBToShannons = require('../utils/convertCKBToShannons');

var express = require('express');
var router = express.Router();

/* POST create transaction request. */
router.post('/create', async function(req, res, next) {

    const { apiKeyHeader, timestampHeader, signatureHeader } = generateAuthHeaders();
    const headers = {
        "x-api-key": apiKeyHeader,
        "x-signature": signatureHeader,
        "x-timestamp": timestampHeader,
    }

    const { data: transaction} = await axios.post(`${process.env.CKBULL_SIGNER_API}/api/transaction-request/generate-native-token-transaction`, {
        "to": req.body.to,
        "amount": BigInt(convertCKBToShannons(req.body.amount)).toString(),
    })

    console.log("TRANSACTION", transaction);

    const body = {
        "signInToken": req.body.signInToken,
        "transaction": transaction,
    }

    const response = await axios.post(`${process.env.CKBULL_SIGNER_API}/api/transaction-request`, body, { headers })
    res.send(response.data)
});


/* GET Polling: transaction-request status. */
router.get('/:id', async function(req, res, next) {
    const response = await axios.get(`${process.env.CKBULL_SIGNER_API}/api/transaction-request/${req.params.id}/status`)
    res.send(response.data)
}); 


module.exports = router;
