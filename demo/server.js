const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
    fs.readFile(
        __dirname + '/build' + (req.url === '/' ? '/index.html' : req.url),
        (err,data) => {
        if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
        }
        res.statusCode = 200
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(data)
    })
}).listen(8000, () => console.log('Listening localhost:8000'))
