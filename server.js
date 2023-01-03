const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
    //console.log(req.url)
    fs.readFile(
        __dirname + '/build' + (req.url === '/' ? '/index.html' : req.url),
        (err,data) => {
        if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
        }
        //res.writeHead(200)
        res.statusCode = 200
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(data)
    })
}).listen(8000, () => console.log('Server running'))
