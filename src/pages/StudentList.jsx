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
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-300 px-3 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">
        Sayur Students
      </h1>

      {/* Loading / Empty */}
      {loading && (
        <p className="text-center text-gray-500">Loading students...</p>
      )}
      {!loading && students.length === 0 && (
        <p className="text-center text-gray-500">No students found.</p>
      )}

      {/* Grid */}
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {students.map((s) => (
          <StudentCard key={s.id || s.username} student={s} />
        ))}
      </div>
    </div>
  );
}
