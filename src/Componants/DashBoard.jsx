import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import DataIntegrity from './DataIntegrity'
import axios from 'axios'
import { ServerUrl } from '../Server'
import ProfileIntegrity from './ProfileIntegrity'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateRange from './DateRange'
import { useNavigate } from 'react-router-dom'
  import Modal from 'react-bootstrap/Modal';
import CreatePersona from './CreatePersona'
import { TokenContext } from './TokenContext'


// import PostQuery from './PostQuery'


function DashBoard() {
  const {token} = useContext(TokenContext)
  const [profiles, setProfiles] = useState([])
  const [clpId, setClpId] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false);
  const [selectedDataFromDataIntegrity,setSelectedDataFromDataIntegrity] = useState(null)

  const handleSelectedDataFromDataIntegrity=(selectedData)=>{           // pass the selected data from dataintegrity to Dashboard
    console.log(selectedData);
    setSelectedDataFromDataIntegrity(selectedData)
  }
console.log(selectedDataFromDataIntegrity);


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
  // console.log(profiles);

  useEffect(() => {
    getProfileCount();
  }, [token])

  const handleSearch = () => {
    setClpId(inputValue);
    // postQuery();
    // setInputValue("")
  }
  const USER_ID = clpId
  console.log(USER_ID);

  const postQuery = async () => {
    console.log("Inside PostQuery Function");

    if (!token) {
      alert("Oauth Token is not Available")
      return;
    }

    const response = await fetch(`https://platform.adobe.io/data/foundation/query/queries?user_id=${USER_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': '2383827e418049e3ad41507d03374c2f',
        'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
        'x-sandbox-name': 'uatmmh',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: JSON.stringify({
        "dbName": "uatmmh:all",
        "sql": `SELECT DISTINCT JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.PROFILEID, 
        JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.journeyVersionName,
        JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.ACTIONNAME,
        JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.stepstatus,
        MF._experience.customerJourneyManagement.messageDeliveryfeedback.feedbackStatus,
        MF.timestamp,
        ET._experience.customerJourneyManagement.messageInteraction.interactionType 
        FROM ajo_entity_dataset AE 
        INNER JOIN ajo_message_feedback_event_dataset MF ON AE._experience.customerJourneyManagement.entities.channelDetails.messageID = MF._experience.customerJourneyManagement.messageExecution.messageID 
        INNER JOIN journey_step_events JE ON AE._experience.customerJourneyManagement.entities.journey.journeyActionID = JE._experience.journeyOrchestration.stepEvents.actionID 
        INNER JOIN ajo_email_tracking_experience_event_dataset ET ON MF._experience.customerJourneyManagement.messageExecution.journeyActionID = ET._experience.customerJourneyManagement.messageExecution.journeyActionID 
        WHERE AE._experience.customerJourneyManagement.entities.channelDetails.channel._id = 'https://ns.adobe.com/xdm/channels/email' 
        AND JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.NODETYPE = 'message' 
        AND JE._EXPERIENCE.JOURNEYORCHESTRATION.STEPEVENTS.PROFILEID = '${USER_ID}' 
        ORDER BY MF.timestamp DESC;`,

        "queryParameters": {
          "user_id": `${USER_ID}`
        },
        "name": "Journey_Integrity_query",
        "description": "",
        "insertIntoParameters": {
          "datasetName": "journey_integrity_dataset"
        }
      })
    })
    console.log(response);

    if (!response.ok) {
      throw new error("Post query was not success",)
    }
    const data = await response.json();
    console.log(data);

    if (data) {
      toast.info("Query Run Succesfully , Kindly Wait for About 10 Minuites to get the Journey Integrity Details", {
        autoClose: 3000,
        position: "top-center"
      })
    }
  }
  const navigate = useNavigate();
  const handleCreatePersona = () => {
    console.log("inside navigate");

    // navigate('/Create-Persona');
    setShow(true)
  }

  const handleCombinedAction = ()=>{                   // combined action for calling two functions
    handleSelectedDataFromDataIntegrity();
    handleCreatePersona();
  }


  return (
    <>
      <div className='d-flex justify-content-around  parentDiv row  p-2'>
        {/* <div className="clo-lg-1"></div> */}
        <div className='TotalDiv col-lg-2 col-md-6 text-center mt-1 mb-3 '>Total Profile Count  <i class="fa-solid fa-circle-info"></i>
          <div className='countDiv'>{profiles.totalFragmentCount}</div>
        </div>
        {/* <div className="clo-lg-1"></div> */}

        <div className='TotalDiv col-lg-2 text-center mt-1 col-md-6 mb-3'>Total Merged Profiles <i class="fa-solid fa-circle-info"></i>
          <div className='countDiv '>{profiles.totalRows}</div>
        </div>
        <div className=' p-2  col-lg-3 col-md-6 mt-auto mb-auto text-center mt-1 w-25 '>
          <DateRange />

        </div>
        <div className='mt-auto mb-auto col-lg-3 col-md-6 text-center' >
          <div>
            <div className='d-flex justify-content-between' >
              <input className='InputSearch' type="text" placeholder='' value={inputValue} onChange={e => setInputValue(e.target.value)} />
              <button className='SearchBtn' onClick={handleSearch}>Search</button>
            </div>

          </div>
        </div>
      </div>
      
      < div className='text-end mb-3 me-3 pe-5'>
            <button className='btn btn-secondary fw-bolder' onClick={handleCombinedAction}>Create Persona</button>
          </div>
          {/* conditional rendering */}
      {
        clpId ? (<ProfileIntegrity token={token} clpId={clpId} />
        ) :
          (<DataIntegrity shareSelectedDataToDashboard={handleSelectedDataFromDataIntegrity } token={token} />
          )
      }
      <ToastContainer />
      {/* <PostQuery clpId={clpId} token={token}/> */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create Persona
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <CreatePersona selectedDataFromDataIntegrity={selectedDataFromDataIntegrity} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DashBoard