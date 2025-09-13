import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PendingDetails() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [projectsRemark, setProjectsRemark] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/pendingRequests")
      .then((res) => {
        const data = res.data.filter((r) => r.username === username);
        setRequests(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [username]);

  const handleAction = async (status) => {
    try {
      if (!requests.length) return;

      const info = requests.find((r) => r.firstName);
      const skills = requests.find((r) => r.skills);
      const projects = requests.find((r) => r.projects);

 
      if (info) {
        await axios.post("http://localhost:5000/students", {
          id: info.id,
          firstName: info.firstName,
          lastName: info.lastName,
          username: info.username,
          email: info.email,
          phoneNumber: info.phoneNumber,
          graduationYear: info.graduationYear,
          currentStatus: info.currentStatus,
          description: info.description,
          photoUrl: info.photoUrl,
        });
      }

     
      if (skills?.skills?.length) {
        for (let skill of skills.skills) {
          await axios.post("http://localhost:5000/skills", {
            id: Date.now().toString() + Math.random(),
            name: skill,
            studentId: info.id,
          });
        }
      }

      if (projects?.projects?.length) {
        for (let project of projects.projects) {
          await axios.post("http://localhost:5000/projects", {
            id: Date.now().toString() + Math.random(),
            ...project,
            studentId: info.id,
          });
        }

        
        if (projectsRemark.trim()) {
          await axios.post("http://localhost:5000/studentMentorRemarks", {
            id: Date.now().toString() + Math.random(),
            studentId: info.id,
            mentorId: 1,
            remark: projectsRemark,
          });
        }
      }

   
      for (let req of requests) {
        await axios.delete(`http://localhost:5000/pendingRequests/${req.id}`);
      }

      alert(`Student ${status}`);
      navigate("/mentor/pending");
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  const info = requests.find((r) => r.firstName);
  const skills = requests.find((r) => r.skills);
  const projects = requests.find((r) => r.projects);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Student Details: {username}</h2>

     
      {info && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2 text-blue-800">Personal Info</h3>
          {info.photoUrl && (
            <img
              src={info.photoUrl}
              alt="student"
              className="w-24 h-24 rounded-full object-cover border"
            />
          )}
          <p><b>Name:</b> {info.firstName} {info.lastName}</p>
          <p><b>Email:</b> {info.email}</p>
          <p><b>Phone:</b> {info.phoneNumber}</p>
          <p><b>Description:</b> {info.description}</p>
          <p><b>Year:</b> {info.graduationYear}</p>
          <p><b>Status:</b> {info.currentStatus}</p>
        </div>
      )}

      
      {skills && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2 text-blue-800">Skills</h3>
          <ul className="list-disc pl-6">
            {skills.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

     
      {projects && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2 text-blue-800">Projects</h3>
          {projects.projects.map((p, i) => (
            <div key={i} className="mb-3">
              <p><b>Project Name:</b> {p.name}</p>
              <p><b>Description:</b> {p.description}</p>
              <p><b>Development Area:</b> {p.developmentArea}</p>
              <p>
                <b>GitHub:</b>{" "}
                <a href={p.gitHub || p.github} target="_blank" rel="noreferrer">
                  {p.gitHub || p.github}
                </a>
              </p>
              <p>
                <b>Website:</b>{" "}
                <a href={p.website} target="_blank" rel="noreferrer">
                  {p.website}
                </a>
              </p>
            </div>
          ))}
          <textarea
            value={projectsRemark}
            onChange={(e) => setProjectsRemark(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Add remark for projects..."
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => handleAction("approved")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleAction("rejected")}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
