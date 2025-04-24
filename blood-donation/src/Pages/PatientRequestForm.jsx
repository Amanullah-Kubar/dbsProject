import React, { useState } from 'react';
import axios from 'axios';

const PatientRequestForm = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: '',
        bloodGroup: '',
        unitsRequired: '',
        dateNeeded: '',
        hospital: '',
        contactNumber: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/requests', formData);
            alert('Request submitted successfully. Matching donors found: ' + res.data.matches.length);
            console.log(res.data.matches); // optional
        } catch (err) {
            console.error(err);
            alert('Submission failed.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center py-10 px-4">
            <div className="bg-[#1E2A38] shadow-xl rounded-3xl w-full max-w-3xl p-8">
                <h2 className="text-2xl font-semibold text-[#DC143C] mb-6 text-center">
                    Patient Blood Request Form
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="patientName" onChange={handleChange} placeholder="Patient Name" className="bg-[#E0E0E0] p-2 rounded-xl" required />
                    <input type="number" name="age" onChange={handleChange} placeholder="Age" className="bg-[#E0E0E0] p-2 rounded-xl" required />
                    <select name="gender" onChange={handleChange} className="bg-[#E0E0E0] p-2 rounded-xl" required>
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <select name="bloodGroup" onChange={handleChange} className="bg-[#E0E0E0] p-2 rounded-xl" required>
                        <option value="">Blood Group</option>
                        <option>A+</option>
                        <option>A−</option>
                        <option>B+</option>
                        <option>B−</option>
                        <option>AB+</option>
                        <option>AB−</option>
                        <option>O+</option>
                        <option>O−</option>
                    </select>
                    <input type="number" name="unitsRequired" onChange={handleChange} placeholder="Units Required" className="bg-[#E0E0E0] p-2 rounded-xl" required />
                    <input type="date" name="dateNeeded" onChange={handleChange} className="bg-[#E0E0E0] p-2 rounded-xl" required />
                    <input type="text" name="hospital" onChange={handleChange} placeholder="Hospital Name/Location" className="bg-[#E0E0E0] p-2 rounded-xl md:col-span-2" required />
                    <input type="tel" name="contactNumber" onChange={handleChange} placeholder="Contact Number" className="bg-[#E0E0E0] p-2 rounded-xl md:col-span-2" required />
                    <textarea name="notes" rows="3" onChange={handleChange} placeholder="Additional Notes" className="bg-[#E0E0E0] p-2 rounded-xl md:col-span-2" />
                    <button type="submit" className="bg-[#DC143C] hover:bg-red-700 text-white px-6 py-2 rounded-full md:col-span-2">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PatientRequestForm;
