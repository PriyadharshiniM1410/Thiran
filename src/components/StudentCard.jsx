import { Link } from "react-router-dom";

export default function StudentCard({student}) {
  const profilePath = `/student/profile/${student.username}`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center w-full max-w-xs">
      
      <img
          src={student.photoUrl || "https://via.placeholder.com/100?text=No+Photo"}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-24 h-24 rounded-full object-cover border"
        />


      <div className="flex flex-col items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {student.firstName} {student.lastName}
        </h3>
        <p className="text-indigo-600 font-medium text-sm sm:text-base mt-1">
          {student.currentStatus}
        </p>
      </div>
    
      <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
        {student.description || "No description provided."}
      </p>

      <Link
        to={profilePath}
        className="mt-4 inline-block px-3 py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-lg shadow hover:bg-indigo-700 transition"
      >
        View Full Profile
      </Link>
    </div>
  );
}
