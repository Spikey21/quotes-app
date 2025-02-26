const http = require("http")

const {getQuotes, getQuote, getRandom, prepareDB} = require("./controllers/quoteController")
const {serveStaticFile} = require("./util/staticServer")

const PORT = 8080
const API_CONTENT_TYPE = {"Content-Type" : "application/json"}

const server = http.createServer(
    async function (req, res) {
        console.log("Request");
    }
);

server.listen(PORT)