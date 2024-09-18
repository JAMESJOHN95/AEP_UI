import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function DataIntegrity({ token }) {
    const [dataset, setDataset] = useState([])

    // Pagenation 
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dataset.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(dataset.length / recordsPerPage);
    const number = [...Array(nPage + 1).keys()].slice(1)

    console.log(token);


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

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }}
        function changeCurrentPage(id) {
            setCurrentPage(id)
        }


        return (
            <>
                <div className='TableDiv p-2 mb-4 w-full overflow-scroll'>
                    <table className='table table-responsive'>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>User Profile Id</th>
                                <th>Name</th>
                                <th>TimeStamp</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length > 0 ? records.map((item, index) => (
                                <tr key={index} >
                                    <td className=' tableHead'>{index + 1}</td>
                                    <td className=' tableHead'>{item['_questrade.clpID'] || '-'}</td>
                                    <td className=' tableHead'>{item['person.name.firstName'] || '-'}</td>
                                    <td className=' tableHead'>{item['_questrade.updatedTimestamp'] || '-'}</td>
                                    <td className=' tableHead'>{item['_questrade.email'] || '-'}</td>
                                    <td className=' tableHead'>{item['mobilePhone.number'] || '-'}</td>
                                </tr>
                            ))
                                :
                                (<div className='p-3 text-center bg-warning'   ><tr >
                                    <Spinner animation="border" size="sm" /></tr></div>)
                            }

                        </tbody>

                    </table>
                  
                        <div className='text-center '>
                            <ul className='d-flex justify-content-center align-items-center'>
                               <div className= 'page-item border p-1 ps-2 pe-2 ms-1 me-1 rounded d-flex align-items-center'>
                                    <li >
                                        {/* <a href="#" className='page-link' onClick={prePage}> */}
                                        <i onClick={prePage}  class="fa-solid fa-backward d-inline-flex"></i>
                                        {/* </a> */}
                                    </li>
                               </div>
                                {
                                    number.map((n, index) => (
                                        <div  className=' page-item border p-1 ps-2 pe-2 ms-1 me-1 rounded '>
                                            <li className={` ${currentPage === n ? "active" : ''} `} key={index}>
                                                <a href="#" className='page-link fw-bolder' onClick={() => changeCurrentPage(n)}>{n
                                                }</a>
                                            </li>
                                        </div>
                                    ))
                                }
                                <div className='page-item border p-1 ps-2 pe-2  ms-1 me-1 rounded d-flex align-items-center '>
                                    <li className='' >
                                        {/* <a href="#" className='page-link' onClick={nextPage}> */}
                                        <i onClick={nextPage} class="fa-solid fa-forward d-inline-flex"></i>
                                        {/* </a> */}
                                    </li>
                                </div>
                            </ul>
                        </div>
                </div>
            </>
        )
    }


    export default DataIntegrity