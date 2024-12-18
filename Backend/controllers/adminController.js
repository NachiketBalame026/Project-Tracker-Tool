const Project = require("../models/project.js");

exports.updateStatus = async (req, res) => {
  const { status, score } = req.body;
  try {
    const project = await Project.findById(req.params.id).populate(
      "assignedTo",
      "username"
    );
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    if (status) project.status = status;
    if (score !== undefined) project.score = score;

    await project.save();
    const updatedProject = await Project.findById(req.params.id).populate(
      "assignedTo",
      "username"
    );
    res.status(200).send(updatedProject);
  } catch (error) {
    console.error(`Error updating project: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedTo", "username");
    res.status(200).json(projects);
  } catch (error) {
    console.error(`Error fetching projects: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
