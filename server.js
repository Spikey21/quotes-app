const http = require("http")

const {getQuotes, getQuote, getRandom, prepareDB, insertQuote, deleteQuote} = require("./controllers/quoteController")
const {serveStaticFile} = require("./util/staticServer")

const PORT = 8080
const API_CONTENT_TYPE = {"Content-Type" : "application/json"}

const server = http.createServer(
    async function (req, res) {
        console.log("Request");

        //prepareDB()

        if (req.url === "/api/quotes" && req.method === "GET") {
            let quotes = await getQuotes()

            if (quotes) {
                res.writeHead(200, API_CONTENT_TYPE)
            } else {
                res.writeHead(404, API_CONTENT_TYPE)
                quotes = {message: "Quotes not found"}
            }
            res.end(JSON.stringify(quotes))
        } else 
        if (req.url === "/api/quotes/random" && req.method === "GET") {
            let quote = await getRandom()
            if (quote) {
                res.writeHead(200, API_CONTENT_TYPE)
            } else {
                res.writeHead(404, API_CONTENT_TYPE)
                quote = {message: "Quote not found"}
            }
            res.end(JSON.stringify(quote))
        }  else
        if (req.url.match(/\/api\/quotes\/([0-9]+)/) && req.method === "GET") {
            const id = req.url.split("/")[3]
            let quote = await getQuote(id)
            if (quote) {
                res.writeHead(200, API_CONTENT_TYPE)
            } else {
                res.writeHead(404, API_CONTENT_TYPE)
                quote = {message: "Quote not found"}
            }
            res.end(JSON.stringify(quote))
        } else 
        if (req.url === "/api/quote/save" && req.method === "POST") {
            let data = ""
            req.on("data", function (chunk) {
                data+= chunk
            })
            req.on("end", async function () {
                const quote = JSON.parse(data)
                let response = {}
                const result = insertQuote(quote)
                if (result) {
                    res.writeHead(200, API_CONTENT_TYPE)
                    response = {saved: true, _id: result.insertedId}
                } else {
                    res.writeHead(404, API_CONTENT_TYPE)
                    response = {saved: false, _id: null}
                }
                res.end(JSON.stringify(response))
            })
        } else 
        if (req.url === "/api/quote/delete" && req.method === "POST") {
            let data = ""
            req.on("data", function (chunk) {
                data+= chunk
            })
            req.on("end", async function () {
                const quote = JSON.parse(data)
                if (!quote || !quote._id) {
                    res.writeHead(404, API_CONTENT_TYPE)
                    response = {message: "Quote not found"}
                } else {
                    let response = {}
                    const result = await deleteQuote(quote._id)
                    if (result && result.deletedCount > 0) {
                        res.writeHead(200, API_CONTENT_TYPE)
                        response = {deleted: true,}
                    }
                    res.writeHead(404, API_CONTENT_TYPE)
                    response = {deleted: false}
                }
                res.end(JSON.stringify(response))
            })
        } else {
            serveStaticFile(req, res)
        }
    }
);

server.listen(PORT)