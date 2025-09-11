import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PendingDetails() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/pendingRequests")
      .then(res => {
        // filter only this student's requests
        const data = res.data.filter(r => r.username === username);
        setRequests(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [username]);

  const handleAction = async (status) => {
    try {
      await axios.post("http://localhost:5000/studentMentorRemarks", {
        id: Date.now().toString(),
        username,
        remark,
        status
      });

      
      const allReq = await axios.get("http://localhost:5000/pendingRequests");
      const studentReqs = allReq.data.filter(r => r.username === username);

      for (let req of studentReqs) {
        await axios.delete(`http://localhost:5000/pendingRequests/${req.id}`);
      }

      alert(`Student ${status}`);
      navigate("/mentor/pending");
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  const info = requests.find(r => r.type === "info");
  const skills = requests.find(r => r.type === "skill");
  const projects = requests.find(r => r.type === "project");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Student Details: {username}</h2>

      {/* Personal Info */}
      {info && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Personal Info</h3>
          <img src={info.data.photoUrl} alt="student" className="w-32 h-32 rounded mb-3" />
          <p><b>Name:</b> {info.data.firstName} {info.data.lastName}</p>
          <p><b>Email:</b> {info.data.email}</p>
          <p><b>Phone:</b> {info.data.phoneNumber}</p>
          <p><b>Description:</b> {info.data.description}</p>
          <p><b>Year:</b> {info.data.currentYear}</p>
          <p><b>Status:</b> {info.data.currentStatus}</p>
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <ul className="list-disc pl-6">
            {skills.data.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <p><b>Project Name:</b> {projects.data.name}</p>
          <p><b>Description:</b> {projects.data.description}</p>
          <p><b>Development Area:</b> {projects.data.developmentArea}</p>
          <p><b>GitHub:</b> <a href={projects.data.gitHub} target="_blank" rel="noreferrer">{projects.data.gitHub}</a></p>
          <p><b>Website:</b> <a href={projects.data.website} target="_blank" rel="noreferrer">{projects.data.website}</a></p>
        </div>
      )}

      {/* Mentor Remark */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Mentor Remark</h3>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Add your remark here..."
        />
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
    </div>
  );
}
