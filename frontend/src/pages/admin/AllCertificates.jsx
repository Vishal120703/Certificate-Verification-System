import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Table.css";

const AllCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get("/allCertificates");
        setCertificates(res.data.data);
      } catch {
        navigate("/dashboard");
      }
    };

    fetchCertificates();
  }, [navigate]);

  // Placeholder delete function
  const handleDelete = (id) => {
    console.log("Delete certificate:", id);
    alert("Delete functionality will be added later.");
  };

  return (
    <div className="table-container">
      <h2>All Certificates</h2>

      <table>
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Duration</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert._id}>
              <td>{cert.certificateId}</td>
              <td>{cert.studentName}</td>
              <td>{cert.studentEmail}</td>
              <td>{cert.internshipDomain}</td>
              <td>
                {new Date(cert.startDate).toLocaleDateString()} -{" "}
                {new Date(cert.endDate).toLocaleDateString()}
              </td>
              <td>
                {new Date(cert.createdAt).toLocaleDateString()}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cert._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>
    </div>
  );
};

export default AllCertificates;