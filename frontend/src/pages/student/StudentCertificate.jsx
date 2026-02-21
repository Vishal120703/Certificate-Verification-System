import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./StudentCertificate.css";

const StudentCertificate = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get(`/certificate/${email}`);
        setCertificates(res.data.certificates);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch certificates");
      }
      setLoading(false);
    };

    fetchCertificates();
  }, [email]);

  const handleDownload = async (certificateId) => {
    try {
      const res = await API.get(`certificate/download/${certificateId}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      alert("Download failed");
    }
  };

  if (loading) {
    return (
      <div className="cert-loading">
        <div className="loader"></div>
        <p>Fetching certificates...</p>
      </div>
    );
  }

  return (
    <div className="cert-container">
      <h2>Certificate Records</h2>
      <p className="email-text">Email: {email}</p>

      {error && <p className="error">{error}</p>}

      {certificates.length === 0 ? (
        <p className="no-cert">No certificates found</p>
      ) : (
        <div className="cert-grid">
          {certificates.map((cert, index) => (
            <div key={index} className="cert-card">
              <h3>{cert.studentName}</h3>

              <p>
                <strong>Certificate ID:</strong>{" "}
                {cert.certificateId}
              </p>

              <p>
                <strong>Domain:</strong>{" "}
                {cert.internshipDomain}
              </p>

              <p>
                <strong>Start:</strong>{" "}
                {new Date(cert.startDate).toDateString()}
              </p>

              <p>
                <strong>End:</strong>{" "}
                {new Date(cert.endDate).toDateString()}
              </p>

              <button
                className="download-btn"
                onClick={() =>
                  handleDownload(cert.certificateId)
                }
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-btn"
        onClick={() => navigate("/certificate")}
      >
        ← Back
      </button>
    </div>
  );
};

export default StudentCertificate;