import {React,useState} from 'react'
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
    const navigate = useNavigate();
    const [form, setform] = useState({email:""})
    const handleOnChnage = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        navigate(`/certificate/${form.email}`);
    }
  return (
    <div>
        StudentLogin
        <form onSubmit={handleOnSubmit}>
            <input type="email" name='email' value={form.email} onChange={handleOnChnage}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default StudentLogin