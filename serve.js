const connect = require("connect");
const serveStatic = require("serve-static");
const open = require("open");

connect()
    .use(serveStatic("./dist/"))
    .listen(8080, () => console.log("Server running on 8080..."));

console.log("Launching the browser on http://localhost:8080...");
open("http://localhost:8080");
console.log("Use CTRL+C to stop the server.");
