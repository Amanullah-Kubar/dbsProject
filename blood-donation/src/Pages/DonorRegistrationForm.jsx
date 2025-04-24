import React, { useState } from 'react';
import axios from 'axios';
export default function DonorRegistrationForm() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        contactNumber: '',
        email: '',
        city: '',
        postalCode: '',
        bloodGroup: '',
        lastDonationDate: '',
        healthy: false,
        noChronicIllness: false,
        notDonatedIn3Months: false,
        consentToContact: false,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/donors', formData);
            alert('Donor registered successfully!');
          } catch (error) {
            console.error('Error:', error.response?.data?.details);
            alert(`Registration failed: ${error.response?.data?.details}`);
          }
          
    };
    return (
        <div className="bg-white min-h-screen p-6 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-[#AEDFF7] shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#1E2A38] mb-6 text-center">
                    Donor Registration
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-[#1E2A38] mb-1">Full Name</label>
                        <input
                            required='true'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-[#1E2A38] mb-1">Date of Birth</label>
                        <input
                            required='true'
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-[#1E2A38] mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#1E2A38] mb-1">Contact Number</label>
                            <input
                                required='true'
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                                placeholder="+92-300-0000000"
                            />
                        </div>
                        <div>
                            <label className="block text-[#1E2A38] mb-1">Email Address</label>
                            <input
                                required='true'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#1E2A38] mb-1">City</label>
                            <input
                                required='true'
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                                placeholder="Enter your city"
                            />
                        </div>
                        <div>
                            <label className="block text-[#1E2A38] mb-1">ZIP / Postal Code</label>
                            <input
                                required='true'
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                                placeholder="e.g., 71000"
                            />
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-[#1E2A38] mb-1">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

                    {/* Last Donation Date */}
                    <div>
                        <label className="block text-[#1E2A38] mb-1">Last Donation Date</label>
                        <input
                            required='true'
                            type="date"
                            name="lastDonationDate"
                            value={formData.lastDonationDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#E0E0E0] rounded-lg bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Health Questions */}
                    <div className="space-y-2">
                        <label className="block text-[#1E2A38] font-medium mb-1">
                            Health & Eligibility
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                required='true'
                                type="checkbox"
                                name="healthy"
                                checked={formData.healthy}
                                onChange={handleChange}
                            />
                            I am currently healthy
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                required='true'
                                type="checkbox"
                                name="noChronicIllness"
                                checked={formData.noChronicIllness}
                                onChange={handleChange}
                            />
                            I have no chronic illness or recent infections
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                required='true'
                                type="checkbox"
                                name="notDonatedIn3Months"
                                checked={formData.notDonatedIn3Months}
                                onChange={handleChange}
                            />
                            I have not donated blood in the last 3 months
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                required='true'
                                type="checkbox"
                                name="consentToContact"
                                checked={formData.consentToContact}
                                onChange={handleChange}
                            />
                            I consent to be contacted for blood donation
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            className="bg-[#DC143C] hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition duration-200"
                        >
                            Register as Donor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
