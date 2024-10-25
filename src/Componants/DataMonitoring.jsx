import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './TokenContext'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import loadarray from 'lodash'
import { tr } from 'date-fns/locale';

function DataMonitoring() {
    const [openIdentity, setOpenIdentity] = useState(false)
    const [openRule, setOpenRule] = useState(false)
    const [openMissingData, seOpenMissingData] = useState(false)
    const [pagination, setPagination] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [dataMonitring, setDataMonitoring] = useState([])
    const { token } = useContext(TokenContext)
    const [rule1Hover, setRule1Hover] = useState(false)
    const [rule2Hover, setRule2Hover] = useState(false)
    const [rule3Hover, setRule3Hover] = useState(false)
    const [rule4Hover, setRule4Hover] = useState(false)
    const [dataset, setDataset] = useState([])   // store snapshot dataset details
    const [show, setShow] = useState(false); // modal operating state
    const [filteredData, setFilteredData] = useState([]) // filtered data stored to compare with snapshot dataset
    const [showdiv1, setShowDiv1] = useState('1')
    const [profileInProgressDs, setprofileInProgressDs] = useState([]) // data ingested in source
    const [profilePersonAccountMemberData, setprofilePersonAccountMemberData] = useState([])
    const [oneTrustPreference, setoneTrustPreference] = useState([])
    const [profileApplicationData, setprofileApplicationData] = useState([])
    const [profileAccountData, setprofileAccountData] = useState([])
    const [customerProfileData, setcustomerProfileData] = useState([])
    const [prospctData, setProspectData] = useState([])


    console.log(token);

    const onHover = () => {
        setRule1Hover(!rule1Hover)
    }
    const onHoverR1 = () => {
        setRule2Hover(!rule2Hover)
    }
    const onHoverR2 = () => {
        setRule3Hover(!rule3Hover)
    }
    const onHoverR3 = () => {
        setRule4Hover(!rule4Hover)
    }
    //------------------------------------------------------------------------------------------------------------------------
    // Pagination
    const pageSize = 10;
    const pageCount = dataMonitring ? Math.ceil(dataMonitring.length / pageSize) : "0"  // math.ceil is used to make the value from boolean to integer
    if (pageCount === 1) return null;
    const pages = loadarray.range(1, pageCount + 1)

    const selectPages = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = loadarray(dataMonitring).slice(startIndex).take(pageSize).value();
        setPagination(paginatedPost)
    }
    //-------------------------------------------------------------------------------------------------------------------------
    const toogleDropdown = () => {
        setOpenIdentity(!openIdentity)
    }

    const togeRuleDropdown = () => {
        setOpenRule(!openRule)
    }

    const toggleMissingDataDropdown = () => {
        seOpenMissingData(!openMissingData)
    }

    const id = ["66e30006fb63d32aee500cc4", "664681357142ae2c9f9b6b7b", "662ada931eaa3e2c9f4f9fea", "664e25c74e3baa2c9d38a8bf", "664e2524d42a82c9d6ab1a6", "662ada938419ba2c9e133a07", "662ada9366eb462c9e17a233"]


    const getSourceDatas = async (id, setstate) => {
        console.log("Inside Get All Dataset");
        if (!token) {
            alert("Token is not Available")
        }
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
                setstate(data.data)
            }
            else {
                console.log("No able to get Data")
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const fetchAllDataset = () => {
        getSourceDatas(id[0], setprofileInProgressDs);
        getSourceDatas(id[1], setprofilePersonAccountMemberData);
        getSourceDatas(id[2], setoneTrustPreference);
        getSourceDatas(id[3], setprofileApplicationData);
        getSourceDatas(id[4], setprofileAccountData);
        getSourceDatas(id[5], setcustomerProfileData);
        getSourceDatas(id[6], setProspectData);
    }


    console.log(profileInProgressDs);
    console.log(profilePersonAccountMemberData);
    console.log(oneTrustPreference);
    console.log(profileApplicationData);
    console.log(profileAccountData);
    console.log(customerProfileData);
    console.log(prospctData);

    //=========================================================================================================================

    const getAllDataset = async () => {
        if (!token) {
            console.log("No token available");
            return;
        }
        try {
            const response = await axios.get('https://platform.adobe.io/data/foundation/catalog/batches ',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': '2383827e418049e3ad41507d03374c2f',
                        'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                        'x-sandbox-name': 'uatmmh'
                    }
                }
            )
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    // ----------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        getSnapshotDataset();
    }, [token])

    const getSnapshotDataset = async () => {
        if (!token) {
            console.log("Token not Generated");
            return;
        }
        try {
            const id = "662ad905f724d82c9ef94a06"
            const URL = `https://platform.adobe.io/data/foundation/export/datasets/${id}/preview`

            const response = await axios.get(URL, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': '2383827e418049e3ad41507d03374c2f',
                    'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                    'x-sandbox-name': 'uatmmh'
                }
            })
            console.log(response);

            if (response) {
                setDataset(response.data.data)
            }
            // const data = await response.json()
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
    console.log(dataset);

    const GetRunsDetails = async () => {
        if (!token) {
            console.log("No Auth Token Is Available");
            return;
        }
        try {
            const response = await axios.get('https://platform.adobe.io/data/foundation/flowservice/runs',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': '2383827e418049e3ad41507d03374c2f',
                        'x-gw-ims-org-id': '3C4727E253DB241C0A490D4E@AdobeOrg',
                        'x-sandbox-name': 'uatmmh'
                    }
                }
            )
            // console.log(response.data.items);
            setDataMonitoring(response.data.items)
            setPagination(loadarray(response.data.items).slice(0).take(pageSize).value())
        } catch (error) {
            console.log(error);
        }
    }
    console.log(dataMonitring);

    useEffect(() => {
        GetRunsDetails();
        getAllDataset();
    }, [])

    const totalInput = dataMonitring.reduce((acc, item) => {
        return acc + (item.metrics?.recordSummary?.inputRecordCount || 0)
    }, 0)

    const handleSourceDtaIntegrity = () => {
        setShowDiv1("2")
    }

    const handleAEPDataIntegrity = () => {
        setShowDiv1("3");
        fetchAllDataset();
    }

    const handleidentityShowResult = () => {
        setShowDiv1("4");
    }

    return (
        <>
            <div className='d-flex justify-content-around p-4 w-100  mb-2'>
                <div>
                    <button className='btn btn-secondary'>
                        Total Records : {totalInput}
                    </button>
                </div>
                <div className='w-25'><input type="date" className='form-control' /></div>
                <div className='d-flex w-25 pe-2'>
                    <input type="text" className='form-control ' />
                    <button className='btn btn-secondary ms-2  '>Search</button>
                </div>
            </div>

            < div className='text-end mb-3 me-3 pe-5 d-flex justify-content-between ms-5'>
                <div>
                    <button className='btn btn-secondary fw-bolder me-4' onClick={handleSourceDtaIntegrity}>Source Data Integrity</button>
                    <button className='btn btn-secondary fw-bolder ms-4 ' onClick={handleAEPDataIntegrity}>AEP Data Integrity</button>
                </div>
                <div><button className='btn btn-secondary fw-bolder'>Create Persona</button></div>
            </div>

            <div className='d-flex justify-content-between'>
                <div className='border ms-2 w-25 rounded m-1 p-3'>

                    <h5 className='text-dark d-flex align-items-center justify-content-between' onClick={toogleDropdown} style={{ cursor: "pointer" }} >IDENTITY INTEGRITY <i className="fa-solid fa-caret-down me-3"></i></h5>

                    {openIdentity && (
                        <div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='lead-id' />
                                <label className='ms-3 fs-5' htmlFor="lead-id">Lead ID</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='uvvid' />
                                <label className='ms-3 fs-5' htmlFor="uvvid">Unique Visitor ID</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='clpid' />
                                <label className='ms-3 fs-5' htmlFor="clpid">User Profile Id</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='otid' />
                                <label className='ms-3 fs-5' htmlFor="otid">One Trust ID</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='userid' />
                                <label className='ms-3 fs-5' htmlFor="userid">User ID</label>
                            </div>
                            <div className=''>
                                <button className='btn border mt-3' onClick={handleidentityShowResult}>Show Result</button>
                            </div>
                        </div>
                    )}
                    <hr />

                    <h5 className='text-dark d-flex align-items-center justify-content-between' onClick={togeRuleDropdown} style={{ cursor: "pointer" }} >RULES INTEGRITY <i className="fa-solid fa-caret-down me-3"></i></h5>

                    {openRule && (
                        <div>
                            <div className='d-flex align-items-center mb-2'>
                                <input className='lg' type="checkbox" />
                                <label onMouseEnter={onHover} onMouseLeave={onHover} className='ms-3 fs-5' htmlFor=""> Rule 1 </label>
                                {rule1Hover && (
                                    <div
                                        className="popup"
                                        style={{
                                            position: 'absolute',
                                            top: '30%',
                                            left: '30px',
                                            backgroundColor: 'white',
                                            border: '1px solid grey',
                                            padding: '15px',
                                            borderRadius: '4px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            zIndex: 1,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        _questrade.FirstCompleteAccDate will have some data only when 'accountStatus=complete' in the profile
                                    </div>
                                )}
                            </div>

                            <div className='d-flex align-items-center mb-2'>
                                <input type="checkbox" />
                                <label onMouseEnter={onHoverR1} onMouseLeave={onHoverR1} className='ms-3 fs-5' htmlFor="">Rule 2</label>
                                {rule2Hover && (
                                    <div
                                        className="popup"
                                        style={{
                                            position: 'absolute',
                                            top: '30%',
                                            left: '30px',
                                            backgroundColor: 'white',
                                            border: '1px solid grey',
                                            padding: '15px',
                                            borderRadius: '4px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            zIndex: 1,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        _questrade.FirstCompleteAccDate will have some data only when 'accountStatus=complete' in the profile
                                    </div>
                                )}

                            </div>
                            <div className='d-flex align-items-center mb-2'>
                                <input type="checkbox" />
                                <label onMouseEnter={onHoverR2} onMouseLeave={onHoverR2} className='ms-3 fs-5' htmlFor="">Rule 3</label>
                                {rule3Hover && (
                                    <div
                                        className="popup"
                                        style={{
                                            position: 'absolute',
                                            top: '35%',
                                            left: '30px',
                                            backgroundColor: 'white',
                                            border: '1px solid grey',
                                            padding: '15px',
                                            borderRadius: '4px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            zIndex: 1,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        _questrade.FirstCompleteAccDate will have some data only when 'accountStatus=complete' in the profile
                                    </div>
                                )}
                            </div>
                            <div className='d-flex align-items-center mb-2'>
                                <input type="checkbox" />
                                <label onMouseEnter={onHoverR3} onMouseLeave={onHoverR3} className='ms-3 fs-5' htmlFor="">{rule4Hover ? "_questrade.FirstCompleteAccDate will have some dataonly when 'accountStatus=complete' in the profile" : "Rule 4"}</label>
                            </div>
                            <div className=''>
                                <button className='btn border mt-3'>Show Result</button>
                            </div>
                        </div>
                    )}
                    <hr />

                    <h5 className='text-dark d-flex align-items-center justify-content-between' onClick={toggleMissingDataDropdown} style={{ cursor: "pointer" }} >MISSING DATA INTEGRITY <i className="fa-solid fa-caret-down me-3"></i></h5>

                    {openMissingData && (
                        <div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" />
                                <label className='ms-3 fs-5' htmlFor="">Lead ID</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" />
                                <label className='ms-3 fs-5' htmlFor="">Unique Visitor ID</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" />
                                <label className='ms-3 fs-5' htmlFor="">User Profile Id</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" />
                                <label className='ms-3 fs-5' htmlFor="">One Trust ID</label>
                            </div>
                            <div className=''>
                                <button className='btn border mt-3'>Show Result</button>
                            </div>
                        </div>
                    )}
                    <hr />



                </div>
                {showdiv1 === '1' && (<div className='p-3 border m-1 me-4 rounded w-75'>
                    <div >
                        <table className='table table-responsive p-3'>
                            <thead>
                                <tr>
                                    <th className='text-center fw-bold'>Sl.No</th>
                                    <th className='text-center fw-bold'>Data Flow</th>
                                    <th className='text-center fw-bold'>Target Dataset</th>
                                    <th className='text-center fw-bold'>Updated By</th>
                                    <th className='text-center fw-bold'>Last Dataflow Run Status</th>
                                    <th className='text-center fw-bold'>Input Record</th>

                                    <th className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pagination ? pagination.map((item, index) => (
                                        <tr key={index} >
                                            <td className=' tableHead text-center'>{index + 1}</td>
                                            <td className=' tableHead text-center'></td>
                                            <td className=' tableHead text-center'></td>
                                            <td className=' tableHead text-center'>{item.updatedBy}</td>
                                            {
                                                item.metrics?.statusSummary?.status === "failed" ? (<td className=' tableHead text-danger text-center   fs-5 '>{item.metrics?.statusSummary?.status || "N/A"}</td>) :
                                                    (<td className=' tableHead text-success text-center fs-5'>{item.metrics?.statusSummary?.status || "N/A"}</td>)
                                            }
                                            <td className=' tableHead text-center'>{item.metrics?.recordSummary?.inputRecordCount || "N/A"}</td>
                                            {
                                                item.metrics?.statusSummary?.status === "success" ? (<td className='text-center'><button className='btn border border-success text-success mb-1'>Reingest</button> <button className='btn border border-primary mb-1 text-primary
                                                    ' variant="outline-info">Notify Stake Holder</button><button className='btn mb-1 border-danger text-danger ms-1'>Delete</button> </td>) :
                                                    (<td></td>)
                                            }
                                            {/* <td><i class="fa-solid fa-trash-can"></i></td> */}
                                        </tr>
                                    ))
                                        :
                                        (<div className='p-5'>Loading...<Spinner animation="border" size="sm" /></div>)
                                }


                            </tbody>

                        </table>
                    </div>
                    <nav className='d-flex justify-content-center'>
                        <ul className="pagination">
                            {
                                pages.map((pages) => (<li style={{ cursor: "pointer" }} onClick={() => selectPages(pages)} className={
                                    pages === currentPage ? "page-item-active border me-3 p-2 rounded" : "page-item border border-dark me-3 rounded p-2"
                                }>
                                    {pages}
                                </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>)}
                {showdiv1 === "2" && (
                    <div className='p-3 border m-1 me-4 rounded w-75'>
                        <table className='table'>
                            <thead >
                                <tr className='fw-bolder'>
                                    <th className='fw-bold'>SlNo.</th>
                                    <th className='fw-bold'>Data Product Name</th>
                                    <th className='fw-bold'>Total Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <th>Brokarage Account Information Data Product</th>
                                    <th>26</th>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <th>CLP Data Product</th>
                                    <th>1   6</th>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <th>SalesForce Sales Cloude</th>
                                    <th>4</th>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <th>IAM / PUBSUB</th>
                                    <th>22</th>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <th>Experience Event Dataset</th>
                                    <th>18  </th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                )}
                {showdiv1 === '3' && (
                    <div className='p-3 border m-1 me-4 rounded w-75'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='fw-bold'>SlNo</th>
                                    <th className='fw-bold'>Profile Flow Name</th>
                                    <th className='fw-bold'>Target Dataset</th>
                                    <th className='fw-bold'>Ingested Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Profile In-Progress DF</td>
                                    <td>Profile In-Progress DS</td>
                                    <td>{profileInProgressDs.length}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Profile Person account Member</td>
                                    <td>profile person account member data</td>
                                    <td></td>
                                    {/* <td>{ profilePersonAccountMemberData ? profilePersonAccountMemberData.length: "0" }</td> */}
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>onetrust preference</td>
                                    <td>onetrust preference</td>
                                    <td>{oneTrustPreference.length}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>profile application data</td>
                                    <td>profile application data</td>
                                    <td>{profileApplicationData.length}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>profile account data</td>
                                    <td>profile account data</td>
                                    <td></td>
                                    {/* <td>{profileAccountData.length}</td> */}
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>customer profile data</td>
                                    <td>customer profile data</td>
                                    <td>{customerProfileData.length}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>prospect data</td>
                                    <td>prospect data</td>
                                    <td>{prospctData.length}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                )}

{showdiv1 === '4' && (
                    <div style={{height:'70vh'}} className='TableDiv1 p-3 border m-1 me-4 rounded w-75 overflow-scroll'>
                        <table className='table table-responsive'>
                            <thead>
                                <tr>
                                    <th className='fw-bold text-center '>SlNo</th>
                                    <th className='fw-bold text-center'>Name</th>
                                    <th className='fw-bold text-center'>CLPID</th>
                                    <th className='fw-bold text-center'>UVVID</th>
                                    <th className='fw-bold text-center'>OTID</th>
                                    <th className='fw-bold text-center'>User ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataset.length>0? dataset.map((item,index)=>(
                                    <tr>
                                    <td>{index+1}</td>
                                <td className=' tableHead text-center'>{item['person.name.firstName'] || '-'}</td>
                                <td className=' tableHead text-center'>{item['_questrade.clpID'] || '-'}</td>
                                <td className=' tableHead text-center'>{item['_questrade.UVVID'] || '-'}</td>
                                <td className=' tableHead text-center'>{item['_questrade.oneTrustIdentifier'] || '-'}</td>
                                <td className=' tableHead text-center'>{item['_questrade.userID '] || '-'}</td>

                                </tr>
                                ))
                                :
                                <tr></tr>
                            }
                                
                               

                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </>
    )
}

export default DataMonitoring