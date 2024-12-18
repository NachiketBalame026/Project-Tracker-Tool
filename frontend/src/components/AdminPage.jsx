import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function AdminPage() {
  const { auth, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [scoreUpdates, setScoreUpdates] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/projects",
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

  const updateProject = async (projectId) => {
    try {
      const status = statusUpdates[projectId] || "";
      const score = scoreUpdates[projectId] || "";

      const response = await axios.put(
        `http://localhost:5000/api/admin/projects/${projectId}/status`,
        { status, score },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const updatedProject = response.data;
      setProjects(
        projects.map((p) => (p._id === projectId ? updatedProject : p))
      );

      // Clear the updates
      setScoreUpdates((prev) => ({
        ...prev,
        [projectId]: "",
      }));
      setStatusUpdates((prev) => ({
        ...prev,
        [projectId]: "",
      }));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleScoreChange = (projectId, newScore) => {
    setScoreUpdates((prev) => ({ ...prev, [projectId]: newScore }));
  };

  const handleStatusChange = (projectId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [projectId]: newStatus }));
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Admin Dashboard</h1>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Project Assignments</h2>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">
                {project.title || "Untitled Project"}
              </h3>
              <p>{project.description || "No description provided"}</p>
              <p>
                Assigned To:{" "}
                {project.assignedTo?.username || project.assignedTo}
              </p>
              <p>Status: {project.status}</p>
              <p>Current Score: {project.score}</p>
              <input
                type="text"
                placeholder="Enter Score"
                value={scoreUpdates[project._id] || ""}
                onChange={(e) => handleScoreChange(project._id, e.target.value)}
                className="input input-bordered mt-2"
              />
              <select
                className="select select-bordered mt-2"
                value={statusUpdates[project._id] || ""}
                onChange={(e) =>
                  handleStatusChange(project._id, e.target.value)
                }
              >
                <option value="">Select Status</option>
                <option value="Accepted">Accepted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                className="btn btn-primary mt-2"
                onClick={() => updateProject(project._id)}
              >
                Submit
              </button>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
