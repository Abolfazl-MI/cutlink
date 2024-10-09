const express = require("express");
const {auth_router}=require('../routes/auth/auth_router')

const router = express.Router();


router.use("/auth",auth_router)

module.exports = {
  appRouter: router,
};
