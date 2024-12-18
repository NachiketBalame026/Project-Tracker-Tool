import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatus from "./UpdateStatus.jsx";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleUpdate = (projectId, newStatus, newScore) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? { ...project, status: newStatus, score: newScore }
          : project
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-8 mb-6">
        All Projects
      </h2>
      {projects.map((project) => (
        <div
          key={project._id}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="mb-1">
            <strong>Description:</strong> {project.description}
          </p>
          <p className="mb-1">
            <strong>Assigned to:</strong> {project.assignedTo}
          </p>
          <p className="mb-1">
            <strong>Status:</strong> {project.status}
          </p>
          <p className="mb-1">
            <strong>Score:</strong> {project.score}
          </p>
          <UpdateStatus project={project} onUpdate={handleUpdate} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
