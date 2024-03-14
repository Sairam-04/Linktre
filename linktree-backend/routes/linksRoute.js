const express = require("express");
const { createLink, addLink } = require("../controller/linksController");
const linksRouter = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");

linksRouter.route("/create-link").post(AuthMiddleware, createLink);
linksRouter.route("/add-link").post(AuthMiddleware, addLink);

module.exports = linksRouter;