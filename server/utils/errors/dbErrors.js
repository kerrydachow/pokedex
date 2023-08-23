class DatabaseQueryError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
    };
}

class DatabaseReadingError extends Error {};

module.exports = {
    DatabaseReadingError
}