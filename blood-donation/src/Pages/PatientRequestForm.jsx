import React from 'react';

const PatientRequestForm = () => {
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center py-10 px-4">
            <div className="bg-[#1E2A38] shadow-xl rounded-3xl w-full max-w-3xl p-8">
                <h2 className="text-2xl font-semibold text-[#DC143C] mb-6 text-center">
                    Patient Blood Request Form
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Patient Name</label>
                        <input
                            type="text"
                            placeholder="Enter patient name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C] bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Age</label>
                        <input
                            type="number"
                            placeholder="Enter age"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Gender</label>
                        <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]">
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Blood Group</label>
                        <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]">
                            <option value="">Select Blood Group</option>
                            <option>A+</option>
                            <option>A−</option>
                            <option>B+</option>
                            <option>B−</option>
                            <option>AB+</option>
                            <option>AB−</option>
                            <option>O+</option>
                            <option>O−</option>
                        </select>
                    </div>

                    {/* Units Required */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Units Required</label>
                        <input
                            type="number"
                            placeholder="Enter number of units"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Date Needed */}
                    <div>
                        <label className="block text-sm font-medium text-[#E0E0E0]">Date Needed</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Hospital Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#E0E0E0]">Hospital Name / Location</label>
                        <input
                            type="text"
                            placeholder="Enter hospital name and location"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#E0E0E0]">Contact Number</label>
                        <input
                            type="tel"
                            placeholder="Enter contact number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        />
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#E0E0E0]">Additional Notes</label>
                        <textarea
                            rows="4"
                            placeholder="Any other information"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-[#DC143C] focus:border-[#DC143C]  bg-[#E0E0E0]"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-[#DC143C] hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientRequestForm;