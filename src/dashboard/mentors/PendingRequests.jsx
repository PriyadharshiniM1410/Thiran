import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/pendingRequests")
      .then(res => setRequests(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, [location.pathname]); // 🔑 refetches if user clicks the same nav again

  const uniqueUsers = [...new Set(requests.map(r => r.username))];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mt-3 mb-3 text-center">Pending Requests</h1>
      {uniqueUsers.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul className="space-y-2">
          {uniqueUsers.map(username => (
            <li
              key={username}
              className="p-3 bg-gray-200 rounded-lg flex justify-between items-center"
            >
              <span className="font-semibold">{username}</span>
              <Link
                to={`/mentor/pending/${username}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
