import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import Profile from './Profile';
import AudienceIntegrity from './AudienceIntegrity';
import JourneyIntegrity from './JourneyIntegrity';
import MetricIntegrity from './MetricIntegrity';


function ProfileIntegrity({ token,clpId,}) { 
    const [active, setactive] = useState('link-0')               // Activate event Key used to display the details in the tab
    const [audienceDta,setAudienceData] = useState([])

    const handleSelect = (eventKey) => {
    setactive(eventKey)
}

const handleAudienceData = (data) => {
    setAudienceData(data);
};

console.log(audienceDta);



    return (
        <>
            <div className='TableDiv p-2 mb-4'>
            <Nav className='d-flex text-center justify-content-around' variant="underline" defaultActiveKey="/home" onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="link-0" className='text-dark'>Profile Integrity</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="link-1" className='text-dark'>Audience Integrity</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" className='text-dark'>Journey Integrity</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3" className='text-dark'>Metric Integrity</Nav.Link>
                        </Nav.Item>
                    </Nav>
{active === 'link-0' && (<Profile clpId = {clpId} token = {token} onAudienceData = {handleAudienceData} />)
}
{active === 'link-1' && (<AudienceIntegrity clpId = {clpId} token = {token} audienceData = {audienceDta} />)
}
{active === 'link-2' && (<JourneyIntegrity clpId = {clpId} token = {token} audienceData = {audienceDta} />)
}
{active === 'link-3' && (<MetricIntegrity/>)

}
            </div>

        </>
    )
}

export default ProfileIntegrity