const Project = require("../models/project");

exports.getCandidateProjects = async (req, res) => {
  try {
    const projects = await Project.find({ assignedTo: req.user.id }).populate(
      "assignedTo",
      "username"
    );
    res.status(200).json(projects);
  } catch (error) {
    console.error(`Error fetching projects: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.assignProject = async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({
    title,
    description,
    assignedTo: req.user.id,
    status: "Assigned",
    score: 0,
  });
  try {
    await project.save();
    res.status(201).json({ message: "Project assigned", project });
  } catch (error) {
    console.error(`Error assigning project: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateProjectStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    if (status) project.status = status;

    await project.save();
    res.status(200).send(project);
  } catch (error) {
    console.error(`Error updating project: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
