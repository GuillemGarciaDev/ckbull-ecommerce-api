const { CKBSdkService } = require("../sdk/CKBSdkService");

async function transactionGenerator(to, amount) {

    const ckbService = new CKBSdkService();
    const transaction =  ckbService.generatePartialTransaction(to, BigInt(amount));
    return transaction.toJSON();

}

module.exports = transactionGenerator;