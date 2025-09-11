import { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../components/StudentCard";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Failed to fetch students:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 px-3 sm:px-6 lg:px-8 py-12">
      
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">
        Featured Students
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {students.map((s) => (
            <StudentCard key={s.id || s.username} student={s} />
          ))}
        </div>
      )}
    </div>
  );
}
