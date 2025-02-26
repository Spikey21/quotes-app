const http = require("http")

const {getQuotes, getQuote, getRandom, prepareDB} = require("./controllers/quoteController")
const {serveStaticFile} = require("./util/staticServer")

const PORT = 8080
const API_CONTENT_TYPE = {"Content-Type" : "application/json"}

const server = http.createServer(
    async function (req, res) {
        console.log("Request");
        if (req.url === "/api/quotes" && req.method === "GET") {
            let quotes = await getQuotes()

            if (quotes) {
                res.writeHead(200, API_CONTENT_TYPE)
            } else {
                res.writeHead(404, API_CONTENT_TYPE)
                quotes = {message: "Quotes not found"}
            }
            res.end(JSON.stringify(jokes))
        } else {
            serveStaticFile(req, res)
        }
    }
);

server.listen(PORT)