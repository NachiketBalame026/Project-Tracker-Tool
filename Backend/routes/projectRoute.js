const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/assign", projectController.assignProject);
router.get("/:id", projectController.getProjectById);
router.post("/update/:id", projectController.updateProjectStatus);
router.get("/", projectController.getAllProjects);
module.exports = router;
