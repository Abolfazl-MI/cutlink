const express = require("express");
const { authMiddleware } = require("../../http/middlewares/auth.mid");
const { LinkController } = require("../../http/controllers/link.controller");
const validateLink = require("../../http/validators/link.validator");
const { validateRequest } = require("../../http/middlewares/validate.mid");

const router = express.Router();

router.route('/').get(
    authMiddleware,
    LinkController.getAllUserLink
).post(
    authMiddleware,
    validateLink(),
    validateRequest,
    LinkController.createLink
)


module.exports = {
  linkRouter: router,
};
