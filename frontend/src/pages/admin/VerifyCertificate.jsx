import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import "./VerifyCertificate.css";

const VerifyCertificate = () => {
  const { certificateId } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        console.log(certificateId);
        const res = await API.get(`/certificate/verify/${certificateId}`);
        setCertificate(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.msg || "Certificate not found"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [certificateId]);

  if (loading) {
    return <div className="verify-container">Verifying...</div>;
  }

  if (error) {
    return (
      <div className="verify-container">
        <div className="error-card">
          <h2>❌ Invalid Certificate</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>✅ Certificate Verified</h2>

        <div className="certificate-info">
          <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
          <p><strong>Name:</strong> {certificate.studentName}</p>
          <p><strong>Email:</strong> {certificate.studentEmail}</p>
          <p><strong>Domain:</strong> {certificate.internshipDomain}</p>
          <p>
            <strong>Duration:</strong>{" "}
            {new Date(certificate.startDate).toLocaleDateString()} -{" "}
            {new Date(certificate.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Issued On:</strong>{" "}
            {new Date(certificate.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;