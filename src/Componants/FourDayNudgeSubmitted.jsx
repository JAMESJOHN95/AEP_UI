import React from 'react'
import Quest from '../Images/Questrade.svg'
import documentimg from '../Images/document.png'
import investing from '../Images/grow.avif'

function FourDayNudgeSubmitted({dataset}) {
  return (
    <>
    <div>
        {dataset.template &&  (
           <div 
           dangerouslySetInnerHTML={{__html:dataset.template}}/>
        )

        }
    </div>
    {/* <div>
        <div className='templateimg'>
            <img className='questlogo' src={Quest} alt="" />
        </div>
        <hr />
        <div>
            <p>Hi Customer Name</p>
        </div>
        <h4 className='text-dark'>Your First Tax-Free Home Savings Account (FHSA) is almost ready to go</h4>
        <h6 className='text-dark'>The path to your investment goal is just 3 step away</h6>
        <div className='mt-4 d-flex'>
            <img className='ms-3 mt-2' style={{height:"30px",width:"30px"}} src={documentimg} alt="" />
            <p className='ms-2 '>Complet Your Documentation <br /> (login to see the once you still need to provide)</p>
        </div>
        <div className='mt-4 d-flex'>
            <img className='ms-3' src={documentimg} style={{height:"30px",width:"30px"}} alt="" />
            <p className='ms-2'>Fund your Account</p>
        </div>
        <div className='mt-4 d-flex'>
            <img className='ms-3' src={investing} style={{height:"30px",width:"30px"}} alt="" />
            <p className='ms-2'>Start Investing For Your Future</p>
        </div>
        <button className='btn btn-success mt-2 ms-3'> Finish Your Account</button>
    </div> */}
    </>
  )
}

export default FourDayNudgeSubmitted