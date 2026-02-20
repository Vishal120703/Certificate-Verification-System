import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../api/axios'
import { useNavigate } from "react-router-dom";

const StudentCertificates = () => {
    const navigate = useNavigate();
  const { email } = useParams()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get(`/certificate/${email}`)
        setCertificates(res.data.certificates)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [email])

  if (loading) return <h3>Loading...</h3>
  const handleOnClick = (id)=>{
    navigate(`/certificate/download/${id}`);


  }

  return (
    <div>
      <h2>Certificates</h2>

      {certificates.map((cert) => (
        <div key={cert._id}>
          <p>{cert.studentName}</p>
          <p>{cert.certificateId}</p>
          <p>{cert.internshipDomain}</p>
          <button type="button" onClick={handleOnClick(cert.certificateId)}>Download</button>
        </div>
      ))}
    </div>
  )
}

export default StudentCertificates