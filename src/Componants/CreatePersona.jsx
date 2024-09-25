import React from 'react'
import '../App.css'

function CreatePersona() {
    return (
        <>
            <div className='m-5 p-4 border rounded '>
               <div className='d-flex justify-content-around'>
                    <div className='p-4'>
                        <label className='personaLabel' htmlFor="">First Name</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">Last Name</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">E-Mail</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">Phone</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">Country</label>
                        <input className='personaInput' type="text" />
                    </div>
                    <div className='p-4'>
                    <label className='personaLabel' htmlFor="">Funding Transaction Amount</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor=""> Funding Transaction Date</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">Product Type</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">Account Detail Type</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">User Language</label>
                    <input className='personaInput' type="text" />
                    </div>
                    <div className=' p-4'>
                    <label className='personaLabel' htmlFor="">Web Interactions</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">Missing Document</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">Web Interactions</label>
                    <input className='personaInput' type="text" />
                    <label className='personaLabel' htmlFor="">Document Category</label>
                    <input className='personaInput' type="text" />
                    </div>
               </div>
                <div className='text-center'><button className='btn btn-info'>Publish As Audience</button></div>
            </div>

        </>
    )
}

export default CreatePersona