// components/UploadSubmission.js
"use client";
import { useState } from "react";

export default function UploadSubmission({ assignmentId, studentId }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", studentId);

    const res = await fetch(`/api/assignment/${assignmentId}/submission`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Submission uploaded successfully!");
    } else {
      alert("Failed to upload submission.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}
