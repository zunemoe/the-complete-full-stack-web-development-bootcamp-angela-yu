const fs = require("node:fs");

fs.writeFile("message.txt", "Hello from Node.js", (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});