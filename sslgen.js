const fs = require("fs");
const selfsigned = require("selfsigned");
const attrs = [{name: "commonName", value: "localhost"}];
const pems = selfsigned.generate(attrs, {
    algorithm: "sha256",
    keySize: 2048,
    extensions: [{
        name: "subjectAltName",
        altNames: [{
            type: 2, // DNS
            value: "localhost"
        }]
    }]
});

fs.writeFileSync("./cert.pem", pems.cert, {encoding: "utf-8"});
fs.writeFileSync("./key.pem", pems.private, {encoding: "utf-8"});
