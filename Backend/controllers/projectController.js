const mongoose = require("mongoose");
const Project = require("../models/project.js");

exports.assignProject = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const project = new Project({
    title,
    description,
    assignedTo,
    status: "Assigned",
    score: 0,
  });
  await project.save();
  res.status(201).send("Project assigned");
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json(project);
};

exports.updateProjectStatus = async (req, res) => {
  const { status, score } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid project ID");
  }
  const projectId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
  await Project.findByIdAndUpdate(projectId, { status, score });
  res.status(200).send("Project updated");
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find({});
  res.status(200).json(projects);
};
