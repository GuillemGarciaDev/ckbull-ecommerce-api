const crypto = require('crypto');



function generateAuthHeaders() {
    const apiSecret = process.env.API_SECRET;
    console.log("apiSecret",apiSecret);
    const timestamp = "message"

    const hmac = crypto.createHmac('sha512', apiSecret);
    hmac.update(timestamp.toString());

    const timestampHeader = timestamp;
    const signatureHeader = hmac.digest('base64');
    const apiKeyHeader = process.env.API_KEY;
    return {
        apiKeyHeader,
        timestampHeader,
        signatureHeader,
    }
}

module.exports = generateAuthHeaders;