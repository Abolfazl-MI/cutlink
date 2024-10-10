const express = require("express");
const { auth_router } = require("../routes/auth/auth_router");
const {linkRouter} = require("./link/link.router");

const router = express.Router();

router.use("/auth", auth_router);
router.use("/links", linkRouter);

module.exports = {
  appRouter: router,
};
