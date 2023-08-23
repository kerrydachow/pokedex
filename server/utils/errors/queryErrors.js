class QueryBadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

class QueryNotANumber extends QueryBadRequest {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    QueryNotANumber,

}