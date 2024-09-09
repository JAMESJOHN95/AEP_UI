import React, { useEffect, useState } from 'react'
import '../App.css'
import DataIntegrity from './DataIntegrity'
import axios from 'axios'
import { ServerUrl } from '../Server'
import ProfileIntegrity from './ProfileIntegrity'


function DashBoard() {
  const [token, setToken] = useState("")
  const [profiles, setProfiles] = useState([])
  const [clpId, setClpId] = useState('')
  const [inputValue,setInputValue]= useState('')

  const fetchToken = async () => {
    try {
      console.log("Inside fetchToken Function");
      const response = await axios.post(`${ServerUrl}/generate-token`);
      console.log(response);
      if (response.data && response.data.token) {
        const Token = response.data.token;
        setToken(Token)
      }
      else {
        console.error("No token received on response");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  console.log(clpId);

  const getProfileCount = async () => {
    if (!token) {
      console.log("No Token Generated");

      return;
    }
    try {
      console.log("Trying to get the Profile Count");
      const response = await axios.get(`${ServerUrl}/Profile-integrity`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response);
      if (response) {
        const Profile = response.data.data;
        setProfiles(Profile)
      }
    } catch (error) {
      console.log(error);

    }
  }

  console.log(profiles);

  useEffect(() => {
    fetchToken();

  }, [])

  useEffect(() => {
    getProfileCount();
  }, [token])

  const handleSearch = () => {
    setClpId(inputValue);
    // setInputValue("")
  }



return (
  <>
    <div className='d-flex justify-content-around  parentDiv row  p-2'>
      {/* <div className="clo-lg-1"></div> */}
      <div className='TotalDiv col-lg-2 text-center  '>Total Profile Count  <i class="fa-solid fa-circle-info"></i>
        <div className='countDiv'>{profiles.totalFragmentCount}</div>
      </div>
      {/* <div className="clo-lg-1"></div> */}

      <div className='TotalDiv col-lg-2 text-center '>Total Merged Profiles <i class="fa-solid fa-circle-info"></i>
        <div className='countDiv '>{profiles.totalRows}</div>
      </div>
      <div className='mt-auto mb-auto col-lg-6 text-center ' >
        <input className='InputSearch' type="text" placeholder='' value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button className='SearchBtn' onClick={handleSearch}>Search</button>
      </div>
    </div>
    {
      clpId ? (<ProfileIntegrity token={token} clpId={clpId} />
      ) :
        (<DataIntegrity token={token}  />
        )
    }
  </>
)
}

export default DashBoard