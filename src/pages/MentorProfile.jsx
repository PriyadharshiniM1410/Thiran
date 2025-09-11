import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MentorProfile() {
  const { username } = useParams();
  const [mentor, setMentor] = useState(null);

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/mentors?username=${username}`)
      .then((res) => {
        setMentor(res.data[0] || null);
      })
      .catch(() => setMentor(null));
  }, [username]);

  if (!mentor) {
    return <p className="p-6 text-center text-gray-600">Mentor not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-xl">
     
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <img
          src={mentor.photoUrl || "https://via.placeholder.com/150?text=Mentor"}
          alt={mentor.firstName}
          className="w-28 h-28 rounded-full border-4 border-indigo-300 shadow"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            {mentor.firstName} {mentor.lastName}
          </h1>
        </div>
      </div>

     
      <div className="mt-8 p-4 rounded-xl border-l-4 border-red-400 bg-red-50 shadow-sm">
        <h2 className="text-xl font-semibold text-red-600">About</h2>
        <p className="text-gray-700 mt-2">
          {mentor.description || "No description provided."}
        </p>
      </div>

      {mentor.expertise && (
        <div className="mt-8 p-4 rounded-xl border-l-4 border-blue-400 bg-blue-50 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-600">Expertise</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {mentor.expertise.split(",").map((item, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {item.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 rounded-xl border-l-4 border-green-400 bg-green-50 shadow-sm">
        <h2 className="text-xl font-semibold text-green-600">Contact</h2>
        <p className="text-gray-700 mt-2">{mentor.email}</p>
      </div>
    </div>
  );
}
