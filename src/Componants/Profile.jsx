import React, { useEffect, useState } from 'react'
import '../App.css'
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Profile({ clpId, token, onAudienceData }) {

    const [entities, setEntity] = useState({})                  // Full details of the searches profile
    const [audiance, setAudiance] = useState([])                // segment Membership data (array of objects)
    const [questrade, setQuestrade] = useState([])              // Purpose data  - datas contain the concent details
    const [filteredConcent, setFilteredConcent] = useState([])   // state contain data which removes the duplicates - final state used to  display the data in the card   
                                                             
    useEffect(() => {
        fetchEntityData();
    }, [clpId])

    console.log(clpId);
    


    const fetchEntityData = async () => {
        const schemaName = "_xdm.context.profile";
        const entityId = clpId; // "e96c453a-4e94-4e4e-a15f-039ab8241306"
        const entityIdNS = "CLPProfileD";
        const fields = "person.name,_questrade,segmentMembership"; //person.name,_questrade,segmentMembership

        // console.log(id);

        const params = new URLSearchParams();
        params.append('schema.name', schemaName);
        if (entityId) params.append('entityId', entityId);
        if (entityIdNS) params.append('entityIdNS', entityIdNS);
        if (fields) params.append('fields', fields);

        try {
            if (!token) {
                throw new Error('Access Token not Genrated');
            }
            const URL = `https://platform.adobe.io/data/core/ups/access/entities?${params.toString()}`;

            const response = await fetch(URL, {
               
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': '2383827e418049e3ad41507d03374c2f',
                    'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                    'x-sandbox-name': 'uatmmh'
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch entity data: ${errorText}`);
            }
            const data = await response.json();
            // console.log(data);
            const entity = Object.keys(data).map(key => ({
                id: key,
                name: data[key].entity.person.name,
                questrade: data[key].entity._questrade,
                allData: data[key],
                purposes: data[key].entity._questrade?.purposes || [],
                audianceData: data[key].entity.segmentMembership?.ups || []

            }));

            setEntity(entity);
            const audienceData = entity.flatMap(e => e.audianceData);
            setAudiance(audienceData);
            onAudienceData(audienceData);

            const purposes = entity.flatMap(e => e.purposes);
            console.log('Purposes:', purposes); // Log the purposes

            setQuestrade(purposes);

        }
        catch (err) {
            console.error('Error fetching entity data:', err);
        }
    };
    useEffect(() => {
        let filtered = questrade.filter((next, concent) => concent === questrade.findIndex(item => item.name === next.name))
        setFilteredConcent(filtered)
    }, [questrade])

    console.log(filteredConcent);

    console.log(entities);
    console.log(audiance);
    console.log(questrade);
    return (
        <>
            <div className='TableDiv1 w-full overflow-scroll'>
                <table className='table border table-responsive table-striped mt-3 p-2'>
                    <thead>
                        <tr>
                            <th className='text-start ps-5'>Attributes</th>
                            <th className='text-start ps-5'>Values</th>

                        </tr>
                    </thead>
                    <tbody>
                        {entities.length > 0 ? entities.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr >
                                    <td className=' tableHead'>First Name</td>
                                    <td className=' tableHead'>{item.name.firstName}</td>
                                </tr>
                                <tr>
                                    <td className=' tableHead'>Last Name</td>
                                    <td className=' tableHead'>{item.name.lastName}</td>
                                </tr>
                                <tr>
                                    <td className=' tableHead'>Current Age</td>
                                    <td className=' tableHead'>{item.questrade.currentAge}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Current Equity</td>
                                    <td className=' tableHead'>{item.questrade.currentEquity}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Trade Past Three Months</td>
                                    <td className=' tableHead'>{item.questrade.tradePastThreeMthTotal}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Email</td>
                                    <td className=' tableHead'>{item.questrade.email}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>First Complete Account Date</td>
                                    <td className=' tableHead'>{item.questrade.firstCompletedAccDate}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Lead Source</td>
                                    <td className=' tableHead'>{item.questrade.leadSource}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Link Token</td>
                                    <td className=' tableHead'>{item.questrade.linkToken}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Onetrust Identifier</td>
                                    <td className=' tableHead'>{item.questrade.oneTrustIdentifier}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>KYC Income</td>
                                    <td className=' tableHead'>{item.questrade.kycIncome}</td>

                                </tr>

                                <tr>
                                    <td className=' tableHead'>Tenure</td>
                                    <td className=' tableHead'>{item.questrade.tenure}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Area Average Invest </td>
                                    <td className=' tableHead'>{item.questrade.areaAvgInvest}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>User Id Created Date </td>
                                    <td className=' tableHead'>{item.questrade.userIdCreateDate}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>User Id</td>
                                    <td className=' tableHead'>{item.questrade.userID}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Merge Policy Id</td>
                                    <td className=' tableHead'>{item.allData.mergePolicy.id}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Last Modified At</td>
                                    <td className=' tableHead'>{item.allData.lastModifiedAt}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>Master Profile Id</td>
                                    <td className=' tableHead'>{item.questrade.masterProfileID}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>UVVID</td>
                                    <td className=' tableHead'>{item.questrade.UVVID}</td>

                                </tr>
                                <tr>
                                    <td className=' tableHead'>CLPID</td>
                                    <td className=' tableHead' >{item.questrade.clpID}</td>

                                </tr>

                            </React.Fragment>
                        )) :
                            <tr className='text-center'>"No Result"</tr>
                        }

                        {/* {questrade.length > 0 ? questrade.map(item => (
                            <React.Fragment >
                                <tr>
                                    <td className=''>Concent Date</td>
                                    <td className=''>{item.consentDate}</td>
                                </tr>
                                <tr>
                                    <td className=''>Concent Name</td>
                                    <td className=''>{item.name}</td>
                                </tr>
                                <tr>
                                    <td className=''>Concent Status</td>
                                    <td className=''>{item.status}</td>
                                </tr>
                            </React.Fragment>
                        ))
                            :
                            <React.Fragment><tr></tr></React.Fragment>

                        } */}

                    </tbody>
                </table>
                
            </div>
            <h4 className='text-center link-underline-primary concentRow'>Concent Details</h4>

            <div className='row container mb-2 mt-2 ms-auto me-auto'>

                {filteredConcent.length > 0 ? filteredConcent.map(item => (
                    <div className=' col-lg-4 col-md-6 ms-auto me-auto'>
                        <Card className='shadow bg-body-tertiary rounded mb-2' style={{ width: '20rem', height: '10rem' }}>
                            <Card.Body>
                                <Card.Text className='cardTitle'><span>Concent Name</span>   : {item.name} </Card.Text>
                                <Card.Text className='cardTitle'><span>Concent Date</span>   : {item.consentDate}</Card.Text>
                                <Card.Text className='cardTitle'><span>Concent Status</span> : {item.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )) :
                    <div></div>
                }

            </div>
        </>
    )
}

export default Profile