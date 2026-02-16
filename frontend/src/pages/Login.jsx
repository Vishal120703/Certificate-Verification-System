import React from 'react'
import{useState} from 'react'
import api from "../services/api";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setform] = useState({username : "",password: ""});
    const navigation = useNavigate();
    const handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await api.post("/login", form);
            alert(res.data.msg);
            navigation("/dashboard")
        }
        catch(err){
            alert(err.res.data.msg)
        }
    }
  return (
    <div>
        <h1>my name is </h1>
        <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login