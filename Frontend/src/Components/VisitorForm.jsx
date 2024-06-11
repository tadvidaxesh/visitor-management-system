import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

const VisitorForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        contactNo: '',
        address: '',
        resume: null,
        image: null
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:3000/auth/add_visitors', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Handle successful form submission
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-50 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Visitor Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="firstName"><strong>First Name:</strong></label>
                        <input type="text" name='firstName' placeholder='Enter First Name' value={formData.firstName} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="lastName"><strong>Last Name:</strong></label>
                        <input type="text" name='lastName' placeholder='Enter Last Name' value={formData.lastName} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="dob"><strong>Date of Birth:</strong></label>
                        <input type="date" name='dob' value={formData.dob} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="gender"><strong>Gender:</strong></label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className='form-control rounded-0'>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' placeholder='Enter Email' value={formData.email} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="contactNo"><strong>Contact Number:</strong></label>
                        <input type="tel" name='contactNo' placeholder='Enter Contact Number' value={formData.contactNo} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="address"><strong>Address:</strong></label>
                        <textarea name="address" placeholder='Enter Address' value={formData.address} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="resume"><strong>Upload Resume (optional):</strong></label>
                        <input type="file" name='resume' onChange={handleFileChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="image"><strong>Upload Image (optional):</strong></label>
                        <input type="file" name='image' onChange={handleFileChange} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default VisitorForm;
