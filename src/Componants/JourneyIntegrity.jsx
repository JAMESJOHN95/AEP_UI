import React, { useEffect, useState } from 'react'

function JourneyIntegrity({clpId,token,audienceData}) {

    const [dataset,setDataset] = useState([])
    const [filteredMetric, setFilteredMetric] = useState([])
    const [decryptedMetric,setDecryptedMetric] = useState([])

    useEffect(()=>{
        getAllDatasetsForJourneyIntegrity();
    },[clpId])

    const convertTimeStamp = (timestamp)=>{
        const date = new Date(parseInt(timestamp));
        return date.toUTCString();
    }
    useEffect(()=>{
        const updatedMetrics = filteredMetric.map(item=>({
            ...item,
            timestamp:convertTimeStamp(item.timestamp)
        }));
        setDecryptedMetric(updatedMetrics)
    },[filteredMetric])

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
    

    const getAllDatasetsForJourneyIntegrity = async () => {
        console.log("Inside Get All Dataset");
        if (!token) {
            alert("Token is not Available")
        }
        const id = "66d9aeb247a1aa2afd54390d"
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
            else{
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
     <div className='w-full overflow-scroll'>
                            <table className='table table-responsive table-striped border p-2 mt-3'>
                                <thead>
                                    <tr>
                                        <th>SlNo</th>
                                        <th>Journey Version Name</th>
                                        <th>Action Name</th>
                                        <th>Status</th>
                                        <th>TimeStamp</th>


                                    </tr>
                                </thead>

                                <tbody>
                                    {decryptedMetric ? (
                                        decryptedMetric.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.journeyversionname}</td>
                                                <td><i>{item.actionname}</i></td>
                                                <td>{item.feedbackstatus}</td>
                                                <td>{item.timestamp}</td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr></tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
    </>
  )
}

export default JourneyIntegrity