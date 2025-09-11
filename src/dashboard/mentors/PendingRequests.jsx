import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/pendingRequests")
      .then(res => setRequests(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const uniqueUsers = [...new Set(requests.map(r => r.username))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
      {uniqueUsers.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul className="space-y-2">
          {uniqueUsers.map(username => (
            <li key={username} className="p-3 bg-gray-200 rounded-lg flex justify-between items-center">
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
