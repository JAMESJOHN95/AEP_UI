import React, { useState } from 'react'

function Campaign() {

    const [dropDown, setDropDown] = useState(false)

    const handleDateDropdown = () => {
        setDropDown(!dropDown)
    }

    return (
        <>
            <div className='d-flex ps-5 pe-5 pt-2 justify-content-between align-items-center'>
                <div className='ms-4'>
                    <button className='m-3 btn fw-bold fs-4 border rounded p-2'>
                        Total Mails Send : 54
                    </button>
                </div>
                <div className='d-flex w-50 align-items-center me-4'>
                    <h6 className=' p-3'>From</h6>
                    <input className='form-control w-50 ms-2 me-2' style={{ height: "30px" }} type="date" />
                    <h6 className='p-3 d-flex align-items-center'>To</h6>
                    <input className='form-control w-50 ms-2 me-2' style={{ height: "30px" }} type="date" />
                </div>
            </div>
            <div className='d-flex'>
                <div className='w-25 border ms-3 rounded p-4 '>

                    <div>
                        <h4 className='text-dark d-flex align-items-center justify-content-between' style={{ cursor: "pointer" }} onClick={handleDateDropdown}>Date Range <i className="fa-solid fa-caret-down me-3"></i></h4>

                        {
                            dropDown && (
                                <div>
                                    <div className='d-flex align-items-center fs-5'>
                                        <input type="checkbox" />
                                        <label className='ms-3' htmlFor="">Last 24 Hours </label>
                                    </div>
                                    <div className='d-flex align-items-center fs-5'>
                                        <input type="checkbox" />
                                        <label className='ms-3' htmlFor="">Last 7 Days</label>
                                    </div>
                                    <div className='d-flex align-items-center fs-5 '>
                                        <input type="checkbox" />
                                        <label className='ms-3' htmlFor="">Last 30 Days</label>
                                    </div>
                                </div>
                            )
                        }


                        <hr />
                    </div>
                </div>
                <div className='p-2 w-75 border ms-3 me-4 rounded'>
                    <table className='table rounded'>
                        <thead>
                            <tr className='text-center fw-bolder'>
                                <th className='text-center'>SlNo</th>
                                <th>Action Name</th>
                                <th className='text-center'>Send</th>
                                <th className='text-center'>Bounced</th>
                                <th className='text-center'>Open</th>
                                <th className='text-center'>Click</th>
                                <th className='text-center'>Unsubscribe</th>
                            </tr>
                        </thead>
                        <tbody className='text-center' style={{ cursor: "pointer" }}>
                            <tr>
                                <td>1</td>
                                <td>4 Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>11 Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>41 Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>4 Day Nudge Partial Dcos Recieved</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>11 Day Nudge Partial Dcos Recieved</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>41 Day Nudge Partial Dcos Recieved</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td>4Day Nudge Submitted</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Campaign