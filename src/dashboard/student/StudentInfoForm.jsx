import { useState } from "react";
import axios from "axios";

export default function StudentInfoForm({ onNext }) {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    currentStatus: "",
    description: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validate = () => {
    const newErrors = {};

    if (!student.username || student.username.length < 3 || student.username.includes(" ")) {
      newErrors.username = "Username must be at least 3 characters and no spaces.";
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!student.email || !emailPattern.test(student.email)) {
      newErrors.email = "Enter a valid email address.";
    }

  
    const phonePattern = /^\d{10}$/;
    if (student.phoneNumber && !phonePattern.test(student.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

  
    const year = parseInt(student.graduationYear);
    if (student.graduationYear && (year < 2000 || year > 2030)) {
      newErrors.graduationYear = "Enter a valid graduation year (2000-2030).";
    }

    if (!student.currentStatus) {
      newErrors.currentStatus = "Please select your current status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 

    try {
      await axios.post("http://localhost:5000/pendingRequests", student);
      alert("Info submitted!");
      setStudent({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        graduationYear: "",
        currentStatus: "",
        description: "",
        photoUrl: "",
      });
      if (onNext) onNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-purple-300 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-purple-900 mb-8">
        Student Information Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Username</h3>
          <input
            type="text"
            name="username"
            value={student.username}
            onChange={handleChange}
            placeholder="Enter username"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
            required
          />
          {errors.username && <p className="text-red-600 mt-1">{errors.username}</p>}
        </div>

        {/* Email */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Email</h3>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
            required
          />
          {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
          <input
            type="tel"
            name="phoneNumber"
            value={student.phoneNumber}
            onChange={handleChange}
            placeholder="9876543210"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phoneNumber ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
          />
          {errors.phoneNumber && <p className="text-red-600 mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Graduation Year */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Graduation Year</h3>
          <input
            type="number"
            name="graduationYear"
            value={student.graduationYear}
            onChange={handleChange}
            placeholder="2025"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.graduationYear ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
          />
          {errors.graduationYear && <p className="text-red-600 mt-1">{errors.graduationYear}</p>}
        </div>

        {/* Current Status */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Current Status</h3>
          <select
            name="currentStatus"
            value={student.currentStatus}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.currentStatus ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
          >
            <option value="">Select Status</option>
            <option value="AvailableToWork">Available to Work</option>
            <option value="NotEmployed">Not Employed</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.currentStatus && <p className="text-red-600 mt-1">{errors.currentStatus}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-800 transition"
          >
            Submit Info
          </button>
        </div>
      </form>
    </div>
  );
}
