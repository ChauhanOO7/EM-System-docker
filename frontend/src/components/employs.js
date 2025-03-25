import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Employs(props) {

    const navigate=useNavigate();
    const handleEdit = (item) => {

        navigate('/update', { state: { user: item } });
    }

    const handledelete=async (item)=>{
        
        const response=await axios.post(`${process.env.REACT_APP_backendurl}/employ/delete`,item);
        if(response.data.navi)
        {
            navigate('/employlist');
        }

    }
    return (
        <div>
            {props.data !== null && props.data.length > 0?
            <table>
            <thead>
                <tr>
                <th>unique id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                <tr key={item._id}>
                    <td>{item._id}</td>
                    <td><img src={`${process.env.REACT_APP_backendurl}/${item.img}`}  alt="" width="50" height="50" /></td>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Mobileno}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Course}</td>
                    <td>{item.created}</td>
                    <td><button id="btn1" onClick={() => handleEdit(item)}><Link to="/update">Edit</Link></button>-<button id="btn2" onClick={() => handledelete(item)}><Link to="/delete">Delete</Link></button></td>
                </tr>
                ))}
            </tbody>
            </table>
                :<h1>No Employers</h1>}
        </div>
    );
  }