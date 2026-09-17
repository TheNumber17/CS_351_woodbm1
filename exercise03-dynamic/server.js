const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    if(req.method === "GET" && req.url === "/") {
        const filepath = path.join(__dirname, "public", "index.html");
        
        fs.readFile(filepath, (err, data) => {
            //TODO
        });

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("HOME");

        return;
    } else if(req.method === "GET" && req.url === "/story") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("STORY");
        
        return;
    }





    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});