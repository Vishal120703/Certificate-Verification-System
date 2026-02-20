import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import StudentLogin from "../pages/auth/StudentLogin";
import StudentCertificates from "../pages/student/StudentCertificates";
import DownloadCertificate from "../pages/student/DownloadCertificate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/certificate" element={<StudentLogin />} />
      <Route path="/certificate/:email" element={<StudentCertificates />} />
      <Route path="/certificate/download/:id" element={<DownloadCertificate/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
