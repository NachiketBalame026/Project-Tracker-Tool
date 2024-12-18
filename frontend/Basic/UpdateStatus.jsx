import React, { useState } from "react";
import axios from "axios";

const UpdateStatus = ({ project, onUpdate }) => {
  const [status, setStatus] = useState(project.status);
  const [score, setScore] = useState(project.score);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/projects/update/${project._id}`,
        {
          status,
          score,
        }
      );
      onUpdate(project._id, status, score); // Notify parent of the update
      console.log("Project status updated successfully");
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
      />
      <button type="submit">Update Status</button>
    </form>
  );
};

export default UpdateStatus;
