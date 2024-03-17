const express = require("express");
const { createLink, addLink, editLink, deleteLink, getAllLinks } = require("../controller/linksController");
const linksRouter = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");

linksRouter.route("/create-link").post(AuthMiddleware, createLink);
linksRouter.route("/add-link").post(AuthMiddleware, addLink);
linksRouter.route("/edit-link/:linkId").put(AuthMiddleware, editLink);
linksRouter.route("/delete-link/:linkId").delete(AuthMiddleware,deleteLink);
linksRouter.route("/get-all-links/:username").get(getAllLinks);

module.exports = linksRouter;