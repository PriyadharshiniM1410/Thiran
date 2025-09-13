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
  }, [location.pathname]);

  const uniqueUsers = [...new Set(requests.map(r => r.username))];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Pending Requests</h1>

      {uniqueUsers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pending requests</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border-2 border-blue-400 shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-blue-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-900">
                  Username
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-900">
              {uniqueUsers.map(username => (
                <tr key={username} className="hover:bg-blue-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium border-r border-gray-900">{username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/mentor/pending/${username}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
