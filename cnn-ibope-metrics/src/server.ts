import express from "express";
import { routes } from "./routes";
require("./teste.ts");

const fs = require("fs");
const cors = require('cors')
const app  = express();
const port = process.env.PORT || 9999;
const https = require('https');

app.use(cors())
app.use(express.json());
app.use(routes);
const options = { 
    key: fs.readFileSync(`${__dirname}/cnnbrasil-key.key`),
    cert: fs.readFileSync(`${__dirname}/cnnbrasil.crt`)
};

https.createServer(options, app).listen(port);