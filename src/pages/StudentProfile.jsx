import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function StudentProfile() {
  const { username } = useParams();
  const [student, setStudent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [remarks, setRemarks] = useState([]);

  
  useEffect(() => {
    axios.get(`http://localhost:5000/students?username=${username}`)
      .then(res => setStudent(res.data[0] || undefined))
      .catch(() => setStudent(undefined));
  }, [username]);

  
  useEffect(() => {
    if (!student?.id) return;

    
    axios.get(`http://localhost:5000/skills?studentId=${student.id}`)
      .then(res => setSkills(res.data));

    
    axios.get(`http://localhost:5000/projects?studentId=${student.id}`)
      .then(res => setProjects(res.data));

    
    axios.get(`http://localhost:5000/studentMentorRemarks?studentId=${student.id}`)
      .then(async res => {
        const data = await Promise.all(res.data.map(async r => {
          if (r.mentorId) {
            const mentorRes = await axios.get(`http://localhost:5000/mentors/${r.mentorId}`);
            return { ...r, mentor: mentorRes.data };
          }
          return r;
        }));
        setRemarks(data);
      });
  }, [student]);

  
  if (student === null) return <p className="text-center mt-12 text-gray-700">Loading...</p>;
  if (student === undefined) return <p className="text-center mt-12 text-red-600">No student found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 px-3 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-xl rounded-2xl space-y-8">

      <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-indigo-100 pb-6">
        <img
          src={student.photoUrl || "https://via.placeholder.com/150?text=Student"}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-28 h-28 rounded-full border-4 border-indigo-200 shadow-lg"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-indigo-900">{student.firstName} {student.lastName}</h1>
          <p className="text-indigo-600 font-semibold mt-1">{student.currentStatus}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl border-l-4 border-red-400 bg-red-50 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">About</h2>
        <p className="text-gray-700">{student.description || "No description provided."}</p>
      </div>

    
      <div className="p-4 rounded-xl border-l-4 border-green-400 bg-green-50 shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-2 border-b border-green-200 pb-1">Skills</h2>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map(s => (
              <span key={s.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                {s.name}
              </span>
            ))}
          </div>
        ) : <p className="text-gray-500 mt-2">No skills listed.</p>}
      </div>

     
      <div className="p-4 rounded-xl border-l-4 border-blue-400 bg-blue-50 shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-2 border-b border-blue-200 pb-1">Projects</h2>
        {projects.length > 0 ? (
          <div className="space-y-4 mt-2">
            {projects.map(p => (
              <div key={p.id} className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  {p.developmentArea && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      {p.developmentArea}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{p.description}</p>
                <div className="flex gap-4 text-sm">
                  {p.gitHub && <a href={p.gitHub} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">GitHub</a>}
                  {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">Live</a>}
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 mt-2">No projects yet.</p>}
      </div>

      
      <div className="p-4 rounded-xl border-l-4 border-purple-400 bg-purple-50 shadow-sm">
        <h2 className="text-xl font-semibold text-purple-700 mb-2 border-b border-purple-200 pb-1">Mentor Remarks</h2>
        {remarks.length > 0 ? (
          <div className="space-y-3 mt-2">
            {remarks.map(r => (
              <div key={r.id} className="p-3 bg-white border rounded-lg shadow-sm">
                <blockquote className="italic text-gray-700">“{r.remark}”</blockquote>
                <p className="text-gray-500 text-sm mt-1">— {r.mentor ? (
                  <Link to={`/mentor/profile/${r.mentor.username}`} className="text-purple-600 hover:underline">
                    {r.mentor.firstName} {r.mentor.lastName}
                  </Link>
                ) : "Mentor"}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 mt-2">No remarks yet.</p>}
      </div>
    </div>
    </div>
  );
}
