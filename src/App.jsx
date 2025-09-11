import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

// Student
import StudentDashboard from "./dashboard/student/StudentDashboard";
import StudentInfoForm from "./dashboard/student/StudentInfoForm";
import StudentSkillsForm from "./dashboard/student/StudentSkillsForm";
import StudentProjectsForm from "./dashboard/student/StudentProjectsForm";
import StudentProfile from "./pages/StudentProfile";
import StudentList from "./pages/StudentList";

// Mentor
import MentorDashboard from "./dashboard/mentors/MentorDashboard";
import PendingRequests from "./dashboard/mentors/PendingRequests";
import PendingDetails from "./dashboard/mentors/PendingDetails";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) setUserRole(storedRole);
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />

      <Routes>
       
        <Route
          path="/"
          element={
            !userRole ? (
              <LoginPage setUserRole={setUserRole} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

   
        <Route path="/home" element={<Home />} />

        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles="student" userRole={userRole}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentInfoForm />} />
          <Route path="info" element={<StudentInfoForm />} />
          <Route path="skill" element={<StudentSkillsForm />} />
          <Route path="project" element={<StudentProjectsForm />} />
        </Route>

        
        <Route
          path="/student/list"
          element={
            <ProtectedRoute allowedRoles={["student", "user", "mentor"]} userRole={userRole}>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile/:username"
          element={
            <ProtectedRoute allowedRoles={["student", "user", "mentor"]} userRole={userRole}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/*"
          element={
            <ProtectedRoute allowedRoles="mentor" userRole={userRole}>
                <MentorDashboard />
            </ProtectedRoute>
          }
        >
            <Route index element={<PendingRequests />} />  
            <Route path="pending" element={<PendingRequests />} />
            <Route path="pending/:username" element={<PendingDetails />} />
            <Route path="list" element={<StudentList />} />
            <Route path="profile/:username" element={<StudentProfile />} />
            </Route>


        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
