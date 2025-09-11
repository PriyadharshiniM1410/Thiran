import { useState } from "react";
import axios from "axios";

export default function StudentSkillsForm({ onNext }) {
  const [username, setUsername] = useState("");
  const [skills, setSkills] = useState([""]);
  const [errors, setErrors] = useState({});

  const skillOptions = [
    "Java","Python","C++","JavaScript","React","Node.js",
    "Spring Boot","Django","Machine Learning","Data Science",
    "SQL","MongoDB","Kotlin","Flutter"
  ];

  const handleSkillChange = (i, value) => {
    const updated = [...skills];
    updated[i] = value;
    setSkills(updated);
    setErrors({ ...errors, skills: null }); 
  };

  const addSkill = () => setSkills([...skills, ""]);

  const validate = () => {
    const newErrors = {};
    if (!username.trim() || username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    const selectedSkills = skills.filter((s) => s.trim() !== "");
    if (selectedSkills.length === 0) {
      newErrors.skills = "Please select at least one skill.";
    }

    // Optional: check for duplicate skills
    const duplicates = selectedSkills.filter((item, idx) => selectedSkills.indexOf(item) !== idx);
    if (duplicates.length > 0) {
      newErrors.skills = "Duplicate skills are not allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/pendingRequests", {
        username,
        skills: skills.filter((s) => s.trim() !== ""),
        status: "pending",
      });

      alert("Skills submitted!");
      setUsername("");
      setSkills([""]);
      if (onNext) onNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-purple-300 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-purple-900 mb-8">
        Student Skills Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <h3 className="text-lg font-semibold mb-1">Username</h3>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
            required
          />
          {errors.username && <p className="text-red-600 mt-1">{errors.username}</p>}
        </div>

        {/* Skills */}
        {skills.map((skill, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold mb-1">Skill {i + 1}</h3>
            <select
              value={skill}
              onChange={(e) => handleSkillChange(i, e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.skills ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
              }`}
            >
              <option value="">Select a skill</option>
              {skillOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        {errors.skills && <p className="text-red-600 mt-1">{errors.skills}</p>}

      
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addSkill}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            + Add Another Skill
          </button>
          <button
            type="submit"
            className="bg-purple-700 text-white py-2 px-6 rounded-lg hover:bg-purple-800"
          >
            Submit Skills
          </button>
        </div>
      </form>
    </div>
  );
}
