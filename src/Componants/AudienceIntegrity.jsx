import React, { useState,useEffect } from 'react'

function AudienceIntegrity({token,clpId,audienceData}) {

    const [segmentData,setSegmentData] = useState([])
    const [keysArray, setKeysArray] = useState([])              // list of audiances profile included in (segment id only)
    const [audianceDetails, setAudianceDetails] = useState({})  // segment membership ( map the array of objects to array with key and value)
    const [filteredSegments, setFilteredSegments] = useState([]) // Filtered segments with the searched clpid



    useEffect(() => {
        console.log('Audiance Data:', audienceData);
        const newNestedObjectData = [];

        // Extracting keys from nested objects within the audiance array
        audienceData.forEach(aud => {
            Object.keys(aud).forEach(key => {
                newNestedObjectData.push({
                    key: key,
                    value: aud[key]
                });
                //    console.log(`Key: ${key}, Value: `, aud[key]);
            });
        });

        setAudianceDetails(newNestedObjectData)
        const newArray = newNestedObjectData.map(item => item.key)
        setKeysArray(newArray)
    }, [audienceData]);

    console.log(audienceData);
    
    useEffect(() => {
        if (segmentData.length > 0) {
            const filtered = segmentData.filter(segment => keysArray.includes(segment.id));
            setFilteredSegments(filtered);
        }
    }, [segmentData, keysArray]);

    console.log(filteredSegments);

    useEffect(()=>{
        fetchAudienceData()
    },[clpId])
    


    const fetchAudienceData = async () => {
        const URL = `https://platform.adobe.io/data/core/ups/segment/definitions?`;
    
        try {
            const response = await fetch(URL, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': '2383827e418049e3ad41507d03374c2f',
                    'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                    'x-sandbox-name': 'uatmmh'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network is not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData);
    
            // Accessing the data from the response object
            const segments = responseData.segments;
            setSegmentData(segments);
            
        } catch (error) {
            console.log(error);
        }
    }

    console.log(segmentData);
    

  return (
    <>
    <div className='w-full overflow-scroll'>
                            <table className='table table-responsive table-striped border p-2 mt-3'>
                                <thead>
                                    <tr>
                                        <th>SlNo</th>
                                        <th>Audience Id</th>
                                        <th>Audience Name</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredSegments.length > 0 ? (
                                        filteredSegments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td></td>
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

export default AudienceIntegrity