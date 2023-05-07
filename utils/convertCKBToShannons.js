
const BigInteger = require("./BigInteger");

const removeTrailingZeros = (amount) => amount.replace(/\.?0*$/, "");

const removeLeftZeros = (amount)=> amount.replace(/^0+/, "");

function stringifyNumber(num) {
    if (isCientificNotation(num)) {
        return parseCientificNotation(num);
    }
    return num.toString();
}

function isCientificNotation(num) {
    return num.toString().includes("e") || num.toString().includes("E");
}

function parseCientificNotation(num) {
    const [base, exp] = num.toString().split(/[eE]/);
    const isNegative = num.toString()[0] === "-";
    const finalBase = base.replace(/-|,/g, "");

    //TODO: Add support for numbers like 1323.3e-3
    if (finalBase.split(".")[0].length > 1) {
        throw new TypeError("Invalid cientific notation");
    }

    const tempAmount = finalBase.replace(".", "");
    const finalExpo = Math.abs(Number(exp));

    if (exp[0] !== "-") {
        return tempAmount.padEnd(finalExpo + 1, "0");
    } else {
        const prefix = isNegative ? "-" : "";
        return prefix + "0." + "0".repeat(finalExpo - 1) + tempAmount;
    }
}

function convertCKBToShannons(amount, supportedDecimalsParam = 8) {
    const [integer, decimals] = stringifyNumber(amount).split(".");
    const supportedDecimals = parseInt(supportedDecimalsParam.toString(), 10);
    if (decimals) {
        //Convert 0.00100 to 0.001
        const cleanedDecimals = removeTrailingZeros(decimals);
        /**
         * The finalNumberDecimals is the number of decimals that will be used to convert the number to BN.
         * If the number has more decimals than the supportedDecimals, we will use the supportedDecimals.
         */
        const finalNumberOfDecimals = Math.min(cleanedDecimals.length, supportedDecimals);
        const finalDecimalPart = cleanedDecimals.slice(0, finalNumberOfDecimals);
        const zerosToBeAdded = supportedDecimals - finalDecimalPart.length;

        /**
         * We need to add zeros to the end of the number to convert it to BN correctly.
         */
        const tempAmount = `${integer}${finalDecimalPart}`;
        const factor = BigInteger.exp("10", zerosToBeAdded.toString());
        const res = removeLeftZeros(BigInteger.mul(tempAmount, factor));
        if (res === "") return "0";
        else return res;
    } else {
        const factor = BigInteger.exp("10", supportedDecimals.toString());
        return BigInteger.mul(integer, factor);
    }
}

module.exports = convertCKBToShannons;