const http = require("http");

const server = http.createServer((req, res) => {

    if(req.method === "GET" && req.url === "/") {
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