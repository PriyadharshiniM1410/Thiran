import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MentorProfile() {
  const { username } = useParams();
  const [mentor, setMentor] = useState(null);

 
  // fetch mentor info
  useEffect(() => {
    axios.get(`http://localhost:5000/mentors?username=${username}`)
         .then(res => setMentor(res.data[0] || undefined))
         .catch(() => setMentor(undefined));
    }, [username]);


  if (mentor === null) {
    return <div className="p-6 text-gray-600">Loading mentor profile...</div>;
  }

  if (mentor === undefined) {
    return (
      <div className="p-6 text-red-500">
        No mentor found with username "{username}"
      </div>
    );
  }

  // Convert expertise string to array if it's a string
  const expertiseArray = typeof mentor.expertise === "string"
    ? mentor.expertise.split(",").map(e => e.trim())
    : Array.isArray(mentor.expertise)
      ? mentor.expertise
      : [];

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-gray-200 pb-6">
        <img
          src={mentor.photoUrl || "https://via.placeholder.com/150?text=Mentor"}
          alt={`${mentor.firstName} ${mentor.lastName}`}
          className="w-28 h-28 rounded-full border-4 border-indigo-300 shadow-lg"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            {mentor.firstName} {mentor.lastName}
          </h1>
        </div>
      </div>
        <div className="mt-8 p-4 rounded-xl border-l-4 border-red-400 bg-red-50 shadow-sm">
          <h2 className="text-xl font-semibold text-red-700 mb-2 border-b border-red-200 pb-1">
            About
          </h2>
          <p className="text-gray-600 mt-1 italic">{mentor.description || "No description provided."}</p>
        </div>
      

      {/* Expertise Section */}
      {expertiseArray.length > 0 && (
        <div className="mt-8 p-4 rounded-xl border-l-4 border-blue-400 bg-blue-50 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2 border-b border-blue-200 pb-1">
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {expertiseArray.map((exp, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="mt-8 p-4 rounded-xl border-l-4 border-green-400 bg-green-50 shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-2 border-b border-green-200 pb-1">
          Contact
        </h2>
        <p className="text-gray-700">
          Email: <span className="font-medium">{mentor.email}</span>
        </p>
      </div>
    </div>
  );
}
