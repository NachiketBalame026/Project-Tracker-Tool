const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController"); // Ensure this path is correct
const authMiddleware = require("../Middleware/protectRoute");

router.get(
  "/projects",
  authMiddleware.authenticate,
  candidateController.getCandidateProjects
);
router.post(
  "/projects",
  authMiddleware.authenticate,
  candidateController.assignProject
);
router.put(
  "/projects/:id/status",
  authMiddleware.authenticate,
  candidateController.updateProjectStatus
);

module.exports = router;
