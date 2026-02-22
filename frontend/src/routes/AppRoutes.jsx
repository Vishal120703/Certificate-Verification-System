import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import StudentLogin from "../pages/auth/StudentLogin";
import StudentCertificates from "../pages/student/StudentCertificate";
import DownloadCertificate from "../pages/student/DownloadCertificate";
import CreateAdmin from "../pages/admin/CreateAdmin";
import UploadCertificates from "../pages/admin/UploadCertificates";
import AllAdmins from "../pages/admin/AllAdmins";
import AllCertificates from "../pages/admin/AllCertificates";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/certificate" element={<StudentLogin />} />
      <Route path="/certificate/:email" element={<StudentCertificates />} />
      <Route path="/certificate/download/:id" element={<DownloadCertificate/>} />
      <Route path="/create-admin" element={<CreateAdmin />} />
      <Route path="/upload" element={<UploadCertificates />} />
      <Route path="/all-admins" element={<AllAdmins />} />
      <Route path="/all-certificates" element={<AllCertificates />} />
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
