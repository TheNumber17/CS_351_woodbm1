const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    if(req.method === "GET" && req.url === "/") {
        const filepath = path.join(__dirname, "public", "index.html");
        console.log("FILE:", filepath);
        fs.readFile(filepath, (err, data) => {
            if(err) {
                console.log("ERROR:", err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });

        //res.writeHead(200, { "Content-Type": "text/plain" });
        //res.end("HOME");

        return;
    } 
    
    else if(req.method === "POST" && req.url === "/story") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
            console.log(`New chunk: ${chunk}`);
        });


        req.on("end", () => {
            console.log(`Request: ${body}`);
            const params = new URLSearchParams(body);
            const firstname = params.get("firstname");
            const birth = params.get("birth");
            const height = params.get("height");
            const dob = params.get("dob");

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>The Story Thus Far...</title>
                    </head>
                    <body>
                        <h1>The Tale of ${firstname}</h1>
                        <p>${firstname} was born at a very young age in a ${birth}, on ${dob}. ${firstname} is 
                        ${height} yards tall.</p>
                    </body>
                </html>
                `);
        });

        console.log("End of response for POST");

        //res.writeHead(200, { "Content-Type": "text/plain" });
        //res.end("STORY");
        
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});