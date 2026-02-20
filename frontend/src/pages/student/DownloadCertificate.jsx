import { useParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../../api/axios";

const DownloadCertificate = () => {
  const { id } = useParams();

  useEffect(() => {
    const downloadFile = async () => {
      try {
        const res = await API.get(`/certificate/download/${id}`, {
          responseType: "blob", // VERY IMPORTANT
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "certificate.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      }
    };

    downloadFile();
  }, [id]);

  return <h3>Downloading...</h3>;
};

export default DownloadCertificate;