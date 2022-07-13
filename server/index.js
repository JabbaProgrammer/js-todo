require("dotenv").config();

const cors = require("cors");
const http = require("http");
const express = require("express");
const {urlencoded, json} = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(router)

server.listen(port, () => console.log(`Server running on port ${port} !`));