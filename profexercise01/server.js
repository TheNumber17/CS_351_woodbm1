const http = require("http");

const server = http.createServer((req,res) => {
    console.log("** HTTP REQUEST ********************");
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log("Headers:", req.headers);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    console.log("** HTTP RESPONSE *******************");
    console.log("Status:", res.statusCode);
    console.log("Content-Type:", res.getHeader("Content-Type"));
    console.log("************************************");

    res.end(`You requested: ${req.url}`);
});

server.listen(3000, () => {
    console.log("Server started at localhost:3000...");
});
