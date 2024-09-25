import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import Profile from './Profile';
import AudienceIntegrity from './AudienceIntegrity';
import JourneyIntegrity from './JourneyIntegrity';
import MetricIntegrity from './MetricIntegrity';


function ProfileIntegrity({ token,clpId,}) { 
    const [active, setactive] = useState('link-0')               // Activate event Key used to display the details in the tab
    const [audienceDta,setAudienceData] = useState([])
    const [dataset, setDataset] = useState([])                                              // Api datas
    const [filteredMetric, setFilteredMetric] = useState([])                                // filtered state
    const [decryptedMetric, setDecryptedMetric] = useState([])                              // state with timestamp decrypted


    const handleSelect = (eventKey) => {
    setactive(eventKey)
}

const handleAudienceData = (data) => {
    setAudienceData(data);
};

console.log(audienceDta);

useEffect(() => {
    getAllDatasetsForJourneyIntegrity();
}, [clpId])

const convertTimeStamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toUTCString();
}
useEffect(() => {
    const updatedMetrics = filteredMetric.map(item => ({
        ...item,
        timestamp: convertTimeStamp(item.timestamp)
    }));
    setDecryptedMetric(updatedMetrics)
}, [filteredMetric])

useEffect(() => {
    const uniqueDataset = dataset.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.journeyversionname === item.journeyversionname &&
            t.profileid === item.profileid &&
            t.actionname === item.actionname &&
            t.feedbackstatus === item.feedbackstatus
        ))
    );
    setFilteredMetric(uniqueDataset);
}, [dataset])

console.log(decryptedMetric);
console.log(filteredMetric);

const getAllDatasetsForJourneyIntegrity = async () => {
    console.log("Inside Get All Dataset");
    if (!token) {
        alert("Token is not Available")
    }
    const id = "66c82839b614f62aee2680f2"
    const URL = `https://platform.adobe.io/data/foundation/export/datasets/${id}/preview`

    try {
        const response = await fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': '2383827e418049e3ad41507d03374c2f',
                'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                'x-sandbox-name': 'uatmmh'
            }
        })

        if (response) {
            const data = await response.json()
            console.log(response);
            setDataset(data.data)
        }
        else {
            console.log("No able to get Data")
        }
    }
    catch (err) {
        console.log(err);
    }
}
console.log(dataset);



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
{active === 'link-2' && (<JourneyIntegrity clpId = {clpId} token = {token} decryptedMetric = {decryptedMetric} />)
}
{active === 'link-3' && (<MetricIntegrity dataset = {dataset} />)

}
            </div>

        </>
    )
}

export default ProfileIntegrity