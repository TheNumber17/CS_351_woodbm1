const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    console.log("URL:", req.url);

    if(req.method === "GET") {
        let urlpath = req.url;
        if(req.url === "/") {
            urlpath = "/index.html";
        }
        else if(req.url === "/mycss/style.css"){
            urlpath = "public/mycss/style.css";
        }


        const filepath = path.join(__dirname, "public", "index.html");
        console.log("FILE:", filepath);
        fs.readFile(filepath, (err, data) => {
            if(err) {
                console.log("ERROR:", err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }
            
            let contenttype = "text/plain";
            if(urlpath.endsWith(".html")) {
                contenttype = "text/html";
            }
            else if(urlpath.endsWith(".css")) {
                contenttype = "text/css";
            }
            res.writeHead(200, { "Content-Type": contenttype }); 
            res.end(data);
        });
        
        return;
    } 

    else if(req.method === "GET" && req.url === "/summary") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
            console.log(`New chunk: ${chunk}`);
        });


        req.on("end", () => {
            console.log(`Request: ${body}`);
            const params = new URLSearchParams(body);
            const name = params.get("name");
            const gender = params.get("gender");
            const haircolor = params.get("haircolor");
            const bloodtype = params.get("bloodtype");
            const map = params.get("map");
            const robot = params.get("robot");
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
                        <p>hello!</p>
                    </body>
                </html>
                `);

            /*if(dob === ""){
                yearstring = "an unknown time";
            }
            else{
                const dateDOB = new Date(dob);
                const year = dateDOB.getDate() + "/" + (dateDOB.getMonth() + 1) + "/" + dateDOB.getFullYear();
                yearstring = `on ${year}`;
            }

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
                        <p>${firstname} was born at a very young age in a ${birth}, on ${yearstring}. ${firstname} is 
                        ${height} yards tall.</p>
                    </body>
                </html>
                `);*/
        });

        console.log("End of response for GET");

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