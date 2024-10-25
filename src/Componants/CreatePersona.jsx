import React, { useEffect, useState } from 'react'
import '../App.css'

function CreatePersona({ selectedDataFromDataIntegrity }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        fundingTransactionAmount: '',
        fundingTransactionDate: '',
        webInteractions: '',
        missingDocument: '',
        documentCategory: '',
        productType: '',
        accountDetailType: '',
        userLanguage: '',
    });
    useEffect(() => {
        if (selectedDataFromDataIntegrity) {
            setFormData({
                firstName: selectedDataFromDataIntegrity['person.name.firstName'] || '',
                lastName: selectedDataFromDataIntegrity['person.name.lastName'] || '',
                email: selectedDataFromDataIntegrity['_questrade.email'] || '',
                phone: selectedDataFromDataIntegrity['mobilePhone.number'] || '',
                country: selectedDataFromDataIntegrity['country'] || 'canada',
                fundingTransactionAmount: selectedDataFromDataIntegrity['funding.transactionAmount'] || '',
                fundingTransactionDate: selectedDataFromDataIntegrity['funding.transactionDate'] || '',
                webInteractions: selectedDataFromDataIntegrity['webInteractions'] || '',
                missingDocument: selectedDataFromDataIntegrity['missingDocument'] || '',
                documentCategory: selectedDataFromDataIntegrity['documentCategory'] || '',
                productType: selectedDataFromDataIntegrity['productType'] || '',
                accountDetailType: selectedDataFromDataIntegrity['accountDetailType'] || '',
                userLanguage: selectedDataFromDataIntegrity['userLanguage'] || '',
            });
        }
    }, [selectedDataFromDataIntegrity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(selectedDataFromDataIntegrity);

    return (
        <>
            <div className='p-2 border rounded '>
                <div className='d-flex justify-content-around'>
                    <div className='p-2'>
                        <label className='personaLabel' htmlFor="">First Name</label>
                        <input
                            className='personaInput'
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor="">Last Name</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor="">E-Mail</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.email}
                            name="email"
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor="">Phone</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor="">Country</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.country}
                            name="country"
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor="">Funding Transaction Amount</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.fundingTransactionAmount}
                            name="fundingTransactionAmount"
                            onChange={handleChange} />
                        <label className='personaLabel' htmlFor=""> Funding Transaction Date</label>
                        <input
                            className='personaInput'
                            type="text"
                            value={formData.fundingTransactionDate}
                            name="fundingTransactionDate"
                            onChange={handleChange} />
                    </div>
                    <div className='p-4'>


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
                        <label className='personaLabel' htmlFor="">Product Type</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">Account Detail Type</label>
                        <input className='personaInput' type="text" />
                        <label className='personaLabel' htmlFor="">User Language</label>
                        <input className='personaInput' type="text" />
                    </div>
                </div>
                <div className='text-center'><button className='btn btn-info'>Search For Lookalikes</button></div>
            </div>

        </>
    )
}

export default CreatePersona