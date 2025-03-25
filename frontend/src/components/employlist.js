import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Employs from './employs';
import {Link} from "react-router-dom";

export default function Employlist() {

    const [all_employs,setallemploys]=useState(null);
    const [sort,setSort]=useState(false);
    const [search,setSearch]=useState(false);
    const [sortedDetails,setDetails]=useState(null);
    const [searchvalue,setValue]=useState("");
    function handlesearch(e)
    {
        setValue(e.target.value);
    }

    async function handleoutput(e)
    {
        setSearch(true);
    }

    useEffect(()=>{

        async function getdetails()
        {
            const details=await axios.get(`${process.env.REACT_APP_backendurl}/employ/alldata`);
            setallemploys(details.data);
        }

        if(!search || searchvalue==="")
        {
            getdetails();
        }
        

        
    },[search,searchvalue]);

    useEffect(()=>{

        async function getspecificdetails()
        {
            const details=await axios.post(`${process.env.REACT_APP_backendurl}/employ/searcheddata`,{searchthing:searchvalue},{
                headers: {
                    'Content-Type': 'application/json'
                }
              });
              
            setallemploys(details.data);
        }

        if(search && searchvalue!=="")
        {
            getspecificdetails();
        }
        
        
    },[search, searchvalue]);

  function handlesort(e)
  {
    if(all_employs)
    {
        setSort(true);
        setDetails([...all_employs].sort((a, b) => a.Name.localeCompare(b.Name)));
    }

  }
    return (
        <div className="employlist">
            <h1>Employee List</h1>
            <div>
                <p>Total Count: {all_employs? all_employs.length:0}</p>
                <Link to="/create"><button id="create">Create Employee</button></Link>
            
            <label htmlFor="serachquery">Search : </label>
            <input type="text" id="serachquery" value={searchvalue} onChange={(e)=>{handlesearch(e)}} placeholder="Search by Name"/>
            <button onClick={handleoutput}>Search</button>
            <button onClick={handlesort}>Sort by name</button>
            </div>
            <Employs data={!sort?all_employs:sortedDetails}/>

        </div>
    );
  }