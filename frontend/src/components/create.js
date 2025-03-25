import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileno: "",
    desg: "",
    gender: "",
    course: []
  });

  async function handleform(e) {
    e.preventDefault();
    if (data.name.length === 0 || data.email.length === 0 || data.mobileno.length === 0 || data.desg.length === 0 || data.gender.length === 0 || data.course.length === 0) {
      setError(true);
      return;
    }
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("mobileno", data.mobileno);
    formdata.append("desg", data.desg);
    formdata.append("gender", data.gender);
    data.course.forEach(course => {
      formdata.append("course", course);
    });
    formdata.append("file", file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendurl}/employ/add`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setData({
        name: "",
        email: "",
        mobileno: "",
        desg: "",
        gender: "",
        course: []
      });

      if (response.data.duplicate) {
        alert("Duplicate Email is Used... Try with new Email.");
        return;
      } else {
        navigate("/employlist");
      }
    } catch (error) {
      console.log(error);
    }

  }

  function handlechange(e) {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setData(newdata);
  }

  function handlechangefile(e) {
    const uploaded_file = e.target.files[0];
    if (uploaded_file && (uploaded_file.type === 'image/jpeg' || uploaded_file.type === 'image/png')) {
      setFile(uploaded_file);
    } else {
      alert('Please select a jpg or png file.');
      e.target.value = null;
    }

  }

  return (
    <div className='createemploy'>
      <h1>Create Employee</h1>
      <form method="post" onSubmit={handleform}>
        <span><label htmlFor="_name">Name : </label>
        <input type="text" id="_name" name="name" value={data.name} onChange={(e) => { handlechange(e) }} /></span>
        {error && data.name !== null && data.name.length <= 0 ? <label id="warning">Name should not be empty!</label> : ""}
        <span><label htmlFor="_email">Email : </label>
        <input type="text" id="_email" name="email" value={data.email} onChange={(e) => { handlechange(e) }} /></span>
        {error && data.email !== null && data.email.length <= 0 ? <label id="warning">Email should not be empty!</label> : ""}
        <span><label htmlFor="_mobileno">Mobile No : </label>
        <input type="text" id="_mobileno" name="mobileno" value={data.mobileno} onChange={(e) => { handlechange(e) }} /></span>
        {error && data.mobileno !== null && data.mobileno.length <= 0 ? <label id="warning">mobileno should not be empty!</label> : ""}
        <span><label htmlFor="_desg">Designation : </label>
        <select id="_desg" name="desg" value={data.desg} onChange={(e) => { handlechange(e) }}>
          <option value="">Select Designation</option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales</option>
        </select></span>
        {error && data.desg !== null && data.desg.length <= 0 ? <label id="warning">Designation should not be empty!</label> : ""}
        <span className='align'><label htmlFor="_gender">Gender : </label>
        <div>
          <input type="radio" id="male" name="gender" value="male" checked={data.gender === 'male'} onChange={(e) => { handlechange(e) }} />
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" checked={data.gender === 'female'} onChange={(e) => { handlechange(e) }} />
          <label htmlFor="female">Female</label>
        </div></span>
        {error && data.gender !== null && data.gender.length <= 0 ? <label id="warning">Gender should not be empty!</label> : ""}
        <span className='align'><label htmlFor="_course">Course : </label>
        <div>
          <input type="checkbox" id="mca" name="mca" value="mca" checked={data.course.includes('mca')} onChange={(e) => {
            const courses = data.course.includes('mca') ? data.course.filter(course => course !== 'mca') : [...data.course, 'mca'];
            setData({ ...data, course: courses });
          }} />
          <label htmlFor="mca">MCA</label>
          <input type="checkbox" id="bca" name="bca" value="bca" checked={data.course.includes('bca')} onChange={(e) => {
            const courses = data.course.includes('bca') ? data.course.filter(course => course !== 'bca') : [...data.course, 'bca'];
            setData({ ...data, course: courses });
          }} />
          <label htmlFor="bca">BCA</label>
          <input type="checkbox" id="bsc" name="bsc" value="bsc" checked={data.course.includes('bsc')} onChange={(e) => {
            const courses = data.course.includes('bsc') ? data.course.filter(course => course !== 'bsc') : [...data.course, 'bsc'];
            setData({ ...data, course: courses });
          }} />
          <label htmlFor="bsc">BSC</label>
        </div></span>
        {error && data.course.length <= 0 ? <label id="warning">Course should not be empty!</label> : ""}
        <span><label htmlFor="_filepath">Image : </label>
        <input type="file" id="_filepath" accept=".jpg,.png" onChange={(e) => { handlechangefile(e) }} /></span>
        <button>Submit</button>
      </form>
    </div>
  );
}
