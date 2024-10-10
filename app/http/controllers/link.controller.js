const LinkModel = require("../models/link_model");
const UserModel = require("../models/user_model");
const ShortUniqueId = require("short-unique-id");
require("dotenv").config();
class LinkController {
  async getAllUserLink(req, res, next) {
    try {
      //todo impl pagination later
      const userId = req.user._id;
      console.log(userId);
      let owned_user_links = await LinkModel.find({
        owner: userId,
      });
      return res.status(200).json({
        statusCode: res.statusCode,
        data: {
          links: owned_user_links,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
  async createLink(req, res, next) {
    try {
      let userId = req.user.id;
      let user_provided_link = req.body.link;
      // generate uuid
      let link_uuid = new ShortUniqueId({ length: 8 }).rnd();
      console.log(link_uuid);
      //create link model
      let linkData = await LinkModel.create({
        original_link: user_provided_link,
        owner: userId,
        shorten_link: link_uuid,
      });
      let link;
      if (process.env.APP_STATE === "dev") {
        link = `http://localhost/${link_uuid}`;
      } else {
        // for production specify host base url in .env file
        link = `${process.env.HOST_BASE_URL}/${link_uuid}`;
      }
      return res.status(200).json({
        statusCode: res.statusCode,
        message: "successFully Created link",
        data: {
          link,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
  async openLink(req, res, next) {
    try {
      // first we got id from link which is going to be after /:id
      let linkId = req.params.linkId;
      // we search db with it
      let linkData = await LinkModel.findOne({
        shorten_link: linkId,
      });
      // if not found link we would redirect to /
      if (!linkData) {
        return res.redirect("/");
      }
      let original_link=linkData.original_link
      linkData.clicks=linkData.clicks+1
      await linkData.save()
      return res.redirect(original_link)
    } catch (e) {
            return next(e)
    }
  }
}

module.exports = {
  LinkController: new LinkController(),
};
