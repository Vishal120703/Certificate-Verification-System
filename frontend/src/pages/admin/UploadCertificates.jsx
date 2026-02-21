import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./UploadCertificates.css";

const UploadCertificates = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !["admin", "super_admin"].includes(user.role)) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await API.post("/certificate/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Certificates</h2>
        <p className="subtitle">
          Upload Excel file to generate certificates
        </p>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result-box">
            <h4>{result.message}</h4>
            <p>Inserted: {result.inserted}</p>
            <p>Skipped: {result.skipped}</p>
          </div>
        )}

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UploadCertificates;