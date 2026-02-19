import {React,useState}from 'react'

const Student = () => {
    const [studentForm, setStudentForm] = useState("");
    const handleOnChange = (e)=>{
        setStudentForm({...studentForm,[e.target.name]:e.target.value});
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        console.log(studentForm)
    }
  return (
    <div>
        Student:
        <form onSubmit={handleOnSubmit}>
            <input type="text" value={studentForm.eamil} name='email' onChange={handleOnChange}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Student