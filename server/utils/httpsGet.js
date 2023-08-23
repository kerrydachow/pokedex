const { API_PORT } = require("./constants");
const https = require("https");

async function request(baseUrl, path) {
    return new Promise ((resolve, reject) => {
        https.get({
            hostname: baseUrl,
            port: API_PORT,
            path,
        }, response => {
            let data = "";

            response.on("data", chunk => {
                data += chunk;
            });

            response.on("error", error => {
                console.log(error);
                reject(error);
            });

            response.on("end", () => {
                resolve(JSON.parse(data));
            });
        });
    });
}

module.exports = { request };