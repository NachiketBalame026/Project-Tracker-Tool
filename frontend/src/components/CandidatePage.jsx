import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function CandidatePage() {
  const { auth, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/candidates/projects",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [auth.token]);

  const assignProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/candidates/projects",
        { title: newProjectTitle, description: newProjectDescription },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const newProject = response.data.project;
      setProjects([...projects, newProject]);
      setNewProjectTitle("");
      setNewProjectDescription("");
    } catch (error) {
      console.error("Error assigning project:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Candidate Dashboard
        </h1>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Assigned Projects</h2>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">
                {project.title || "Untitled Project"}
              </h3>
              <p>{project.description || "No description provided"}</p>
              <p>Status: {project.status}</p>
              <p>Current Score: {project.score}</p>
            </div>
          ))
        ) : (
          <p>No projects assigned.</p>
        )}

        <h2 className="text-2xl font-semibold mb-4">Assign New Project</h2>
        <div className="mb-4 p-4 border rounded-lg">
          <input
            type="text"
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <textarea
            placeholder="Project Description"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            className="textarea textarea-bordered w-full mb-2"
          />
          <button className="btn btn-primary" onClick={assignProject}>
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;
