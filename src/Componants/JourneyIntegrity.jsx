import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FourDayNudgeSubmitted from './FourDayNudgeSubmitted';

function JourneyIntegrity({ clpId, token }) {

    const [dataset, setDataset] = useState([])                                              // Api datas
    const [filteredMetric, setFilteredMetric] = useState([])                                // filtered state
    const [decryptedMetric, setDecryptedMetric] = useState([])                              // state with timestamp decrypted
    const [show, setShow] = useState(false);                                                // Modal
    const [selectedAction, setSelectedAction] = useState("")                                 // modal
    const [allMailTemplates, setAllMailTemplates] = useState([])
    // handle modal
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setSelectedAction(item)
        setShow(true);
    }

    useEffect(() => {
        getAllEmailTemplates()
    }, [token])

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
        const id = "66c82839b614f62aee2680f2"  // "66c82839b614f62aee2680f2" 
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
    // console.log(dataset.template);
    

    // -------------------------------------------------------- Get all email templates -------------------------------------------------------//

    const getAllEmailTemplates = async () => {

        if (!token) {
            console.log("Oauth Token is not available");
        }
        try {
            const response = await fetch("https://platform.adobe.io/ajo/content/templates",
                {
                    headers: {
                        // 'Accept': 'application/vnd.adobe.ajo+json; version=1',
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': '2383827e418049e3ad41507d03374c2f',
                        'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                        'x-sandbox-name': 'uatmmh'
                    }
                })

            if (response.ok) {
                const data = await response.json()
                // console.log(data);
                setAllMailTemplates(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(allMailTemplates);
    console.log(decryptedMetric);
    

    // const compareActionName = (selectedAction,allMailTemplates) =>{
    //     if(selectedAction.actionname === allmai)
    // }
    
    return (
        <>
            <div className='w-full overflow-scroll journeyTable'>
                <table className='table table-responsive  border p-2 mt-3'>
                    <thead>
                        <tr>
                            <th className='text-center'>SlNo</th>
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
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{item.journeyversionname}</td>
                                    <td>
                                        <a onClick={() => handleShow(item)} href="#">
                                            {item.actionname}
                                        </a>
                                    </td>
                                    <td>{item.feedbackstatus}</td>
                                    <td>{item.timestamp}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>No Dat to Show</tr>
                        )}

                    </tbody>
                </table>
            </div>

            {/* Modal  -----------------------------------------------------------------------------------------*/}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal"
            >
                <Modal.Header className='modalbody '>
                    <Modal.Title>{selectedAction?.actionname}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalbody'>
                    <FourDayNudgeSubmitted dataset = {dataset} />
                </Modal.Body>
                <Modal.Footer className='modalbody'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default JourneyIntegrity