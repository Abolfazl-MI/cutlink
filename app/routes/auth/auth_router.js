const express = require("express");
const {
  authenticationValidator,
} = require("../../http/validators/auth_validator");
const { validateRequest } = require("../../http/middlewares/validate.mid");
const { AuthController } = require("../../http/controllers/auth_controller");
const router = express.Router();

router
  .route("/signup")
  .post(authenticationValidator(), validateRequest, AuthController.signup);

router
    .route('/login')
    .post(authenticationValidator(),validateRequest,AuthController.login)
module.exports = {
  auth_router: router,
};
