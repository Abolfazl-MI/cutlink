const { Application } = require("./app/server");

const dotenv = require("dotenv").config();



new Application(process.env.PORT,process.env.DB_URL)