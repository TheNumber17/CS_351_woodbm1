const http = require('http');

const server = http.createServer((req, res) => {
    console.log("** HTTP Request ******************");
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log("Headers:", req.headers);
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}