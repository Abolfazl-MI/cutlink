const express = require("express");
const { LinkController } = require("../../http/controllers/link.controller");

const router = express.Router();

router.route("/").get( (req, res, next) => {
  return res.status(200).json({
    message: "home",
  });
});

router.route('/:linkId').get(
    LinkController.openLink
)


module.exports = {
  mainRouter: router,
};
