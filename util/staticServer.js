const fs = require("fs")
const path = require("path")
const url = require("url")

const mimeTypes = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".json" : "application/json",
    ".css" : "text/css",
    ".jpg" : "image/jpeg",
    ".png" : "image/png",
}

// reg: /app.js
function serveStaticFile(req, res) {
    const baseURL = req.protocol + "://" + req.headers.host + "/"
    const parsedURL = new URL(req.url, baseURL)
    let pathSanitize = path.normalize(parsedURL.pathname)
    let pathname = path.join(__dirname, "..", "static", pathSanitize)
    
    if (fs.existsSync(pathname)) {
        if (fs.statSync(pathname).isDirectory()) {
            pathname+="/index.html"
        }
        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500
                res.end("Error! File not found: ", err)
            } else {
                const extension = path.parse(pathname).ext
                res.setHeader("Content-type", mimeTypes[extension])
                res.end(data)
            }
        })
    } else {
        res.statusCode = 404
        res.end("Error! File not found")
    }
}

module.exports = {
    serveStaticFile
}