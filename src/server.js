import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import { sendJobMail, updateFreeViewCv } from "./utils/schedule";
const setupSwagger = require("../swaggerConfig");

require("dotenv").config();

let app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
setupSwagger(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
sendJobMail();
updateFreeViewCv();

viewEngine(app);
initwebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  console.log("Backend Nodejs is running on the port : " + port);
});
