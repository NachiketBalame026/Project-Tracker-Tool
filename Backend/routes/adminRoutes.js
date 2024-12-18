const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../Middleware/protectRoute.js");

router.get(
  "/projects",
  authMiddleware.authenticate,
  authMiddleware.authorize(["admin"]),
  adminController.getAllProjects
);

router.put(
  "/projects/:id/status",
  authMiddleware.authenticate,
  authMiddleware.authorize(["admin"]),
  adminController.updateStatus
);

module.exports = router;
