import React from 'react'
import one from '../Images/1on1.png'
import choose from '../Images/choose.webp'
import main from '../Images/main.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function Content() {
    const [selected,setSelected] = useState("showAll")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e)=>{
        setSelected(e.target.value)
    }


    return (
        <>
            <div className='row mt-4 ms-auto me-auto'>
                <div className="col-lg-3 text-center">
                    <button className='btn btn-primary ps-4 pe-4 fs-4 bolder'>Publish Content</button>
                </div>
                <div className="col-lg-3 text-center">
                    <button className='btn btn-secondary ps-4 pe-4 fs-4'>Unpublish Content</button>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3 text-start">
                    <button className='btn btn-primary ps-4 pe-4 fs-4'> Create New Content</button>
                </div>

            </div>
            <div className="row mt-3 p-4">
                <div className="col-lg-6 text-center">
                    <input type="text" className='form-control w-75 me-auto ms-auto' />
                </div>
                <div className="col-lg-6 d-flex text-center align-items-center"><h5>From</h5>
                    <input type="date" className='w-25 me-2 form-control ms-3 me-3' placeholder='Start Date' /><h5>To</h5>
                    <input type="date" className='w-25 me-2 form-control ms-3' placeholder='End Date' />
                    <button className='btn btn-primary me-3 ms-3'>Search</button>
                    <button className='btn btn-secondary'>Clear</button>
                </div>
            </div>
            <div className='row m-2 p-2 border'>
                <div className="col-lg-3 border p-3">
                    <div className=' p-2 mb-3'>
                        <h5 className='text-dark'>Expiring Content</h5>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Last 24 Hours</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Last 7 Days</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Last 30 Days</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Last 60 Days</label>
                        </div>

                    </div>
                    <hr />
                    <div className=' p-2'>
                        <h5 className='text-dark'>Language</h5>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>French</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Spanish</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>English</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Chinese</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>German</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Portugese</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Japanese</label>
                        </div>
                        <div className='d-flex align-items-center asideLanguage mb-2'>
                            <input type="radio" className='ms-3' />
                            <label htmlFor="" className='mt-1 ms-3 align-items-center'>Russian</label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 border ">
                    <div className='p-3 ms-2 d-flex align-items-center justify-content-between '>
                        <div>
                            <input
                             type="radio" 
                             className='me-2' 
                             value="showAll"
                             checked={selected === 'showAll'}                             
                             onChange={handleChange}
                             id='showall'
                            //  defaultChecked
                              />
                            <label htmlFor="showall" className='me-2'>Show All</label>
                            <input 
                            type="radio" 
                            className='me-2'
                            value='activeContent'
                            checked={selected==='activeContent'} 
                            onChange={handleChange}
                            id='activecontent'
                            />
                            <label htmlFor="activecontent" className='me-2'>Active Content</label>
                            <input 
                            type="radio" 
                            className='me-2'
                            value='expiredContent'
                            checked={selected==='expiredContent'}
                            onChange={handleChange}
                            id='expiredcontent'
                             />
                            <label htmlFor="expiredcontent" className='me-2'>Expird Content</label>
                        </div>
                        <div>
                            <button className='btn btn-primary ms-2 me-2'>Edit</button>
                            <button className='btn btn-primary ms-2 me-2'>Publish</button>
                            <button className='btn btn-primary ms-2 me-2'>Deactivate</button>
                        </div>
                    </div>
                    <div className='p-3 text-end'>
                        <button className="me-2 btn p-2 border rounded "><i class="fa-solid fa-backward"></i></button>
                        <button className="me-2 btn p-2 border rounded">1</button>
                        <button className="me-2 btn p-2 border rounded">2</button>
                        <button className="me-2 btn p-2 border rounded">3</button>
                        <button className="me-2 btn p-2 border rounded">4</button>
                        <button className="me-2 btn p-2 border rounded">5</button>
                        <button className="me-2 btn p-2 border rounded"><i class="fa-solid fa-forward"></i></button>
                    </div>
                    <div className='w-75 ms-auto me-auto' >
                        <div >
                            <h3 className='text-center'>Providing you with exceptional investing content.</h3>
                            <hr />
                            <div className='d-flex mb-3 border p-3'>
                                <div className='w-25'>
                                    <img style={{ height: "150px", width: "200px" }} src={one} alt="No Image" />
                                </div>
                                <div className='w-75 ms-3'>
                                    <p className='fs-4'>Get a 1-on-1 demo of Questrade Trading</p>
                                    <p className='fs-4'>
                                        Ready to start trading stocks? Request a demo today to get a 1-on-1 tutorial by one of our reps to get some trading practice on our Questrade Trading platform.
                                    </p>
                                    <div className='d-flex justify-content-between'><a className='fs-5' target='_blank' href="https://www.questrade.com/self-directed-investing/trading-platforms/questrade-trading?s_cid=QFGBLOG_095_email_qcom_lead_pulse&eml=QFGBLOG_095_QPULSE061524_email_qcom_lead_pulse&utm_medium=email&utm_source=qcom&utm_campaign=QFGBLOG_095&utm_content=lead_pulse&mkt_tok=NDYzLUFUUy0yODIAAAGTu2DPsXmB2nGhVrS1C3vUIBO_1i5JMryktuR8VGZHCKmvTjeeCD7AVHAVisr_raQ1Pq3fAWbIalyjsHf5f7kR24jo17uDU7TpCOvCO5iM">Request a Demo </a>
                                        <button onClick={handleShow} className='btn border'>
                                            <i class="fa-solid fa-chart-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------------------------------------------------- */}
                            <div className='d-flex mb-3 border p-3'>
                                <div className='w-25'>
                                    <img style={{ height: "150px", width: "200px" }} src={choose} alt="No Image" />
                                </div>
                                <div className='w-75 ms-3'>
                                    <p className='fs-4'>How To Choose The Right Account For Your Investments</p>
                                    <p className='fs-4'>
                                        Learn how to choose the right account type and set investment goals you can achieve.
                                    </p>
                                    <div className='d-flex justify-content-between'> <a className='fs-5' target='_blank' href="https://www.questrade.com/learning/investment-concepts/accounts-101/how-to-choose-the-right-account-for-your-investments?%20s_cid=QFGBLOG_019_email_qcom_lead_pulse&eml=QFGBLOG_019_QPULSE030924_email_qcom_lead_pulse&utm_medium=email&utm_source=qcom&utm_campaign=QFGBLOG_019&utm_content=lead_pulse&mkt_tok=NDYzLUFUUy0yODIAAAGTu2DPsZ1CDKrGniPm60b-dPRv4BAzj0PS7LHXcXEDfBlY8nmLxpRx5NsCW_oZMNdVxtU0-5s1ZeNlWpkGp53fkBt3r2aDvJoRKJDkVpa6#how-to-choose-the-right-account-for-your-investments">Read More </a>
                                        <button onClick={handleShow} className='btn border '>
                                            <i class="fa-solid fa-chart-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <img style={{ width: '730px' }} src={main} alt="No Image" />
                            <h3 className='mt-3'>Take your charting even further</h3>
                            <p className='fs-4'>Trade currencies, commodities and more on the TradingView platform | Access the best-in-class charting and analytical tools with your Questrade broker account.</p>
                            <button className='btn btn-success mb-5'>
                                <a className='text-light' target='_blank' href="https://www.questrade.com/self-directed-investing/tools/tradingview?s_cid=QFGBLOG_092_email_qcom_lead_pulse&eml=QFGBLOG_092_QPULSE061524_email_qcom_lead_pulse&utm_medium=email&utm_source=qcom&utm_campaign=QFGBLOG_092&utm_content=lead_pulse&mkt_tok=NDYzLUFUUy0yODIAAAGTu2DPsers25aujfknwXgOkFv2nBFm3V-qufc5JAxkTCowN8OOETQaeeWAUXJx9hyCwGdbJZf0iu4udcTf_-BJYmb8OB4NmLPOmqCeBxgY">LEARN MORE</a>

                            </button>
                            
                           
                            
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Analytics</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <button className='text-dark w-100 mb-3 btn fs-3'>Total Mails : 48 </button>

                    <div className='d-flex justify-content-around'>
                        <button className='text-dark ms-4  btn fs-3'>Open : 42</button>
                        <button className='text-dark ms-5 btn fs-3'>Impressions : 9</button>
                        <button className='text-dark ms-5  btn fs-3'>CTA Click : 33</button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Content