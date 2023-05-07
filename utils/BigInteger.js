const BN = require("big-integer");

class BigInteger {
    static eq(a, b) {
        return BN(a).equals(b);
    }

    static gt(a, b) {
        return BN(a).greater(b);
    }

    static gte(a, b) {
        return BN(a).greaterOrEquals(b);
    }

    static exp(a, b) {
        return BN(a).pow(b).toString();
    }

    static mul(a, b) {
        return BN(a).times(b).toString();
    }

    static minus(a, b) {
        return BN(a).subtract(b).toString();
    }

    static add(a, b) {
        return BN(a).add(b).toString();
    }

    static div(a, b) {
        return BN(a).divide(b).toString();
    }
}

module.exports = BigInteger;