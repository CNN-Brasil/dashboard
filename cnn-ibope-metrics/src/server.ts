import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { initCrons } from "./routes/cronInit/croninit.route";
import "express-async-errors";

const fs = require("fs");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 9999;
const https = require('https');

app.use(cors())
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // if (err instanceof AppErorr)

  return res.status(500).json({
    status: "Error",
    message: `Internal Server Error ${err.message}`
  });
});

const options = {
  key: fs.readFileSync(`${__dirname}/cnnbrasil(1).key`),
  cert: fs.readFileSync(`${__dirname}/cnnbrasil.crt`)
};

https.createServer(options, app).listen(port);

/* Initialize the cron */
initCrons();