import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchingDonorsList = ({ patientBloodGroup }) => {
    const [donors, setDonors] = useState([]);

    // Fetch matching donors based on patient's blood group
    useEffect(() => {
        const fetchMatchingDonors = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/donors?blood_group=${patientBloodGroup}`);
                setDonors(response.data);
            } catch (error) {
                console.error("Error fetching matching donors:", error);
            }
        };

        fetchMatchingDonors();
    }, [patientBloodGroup]);

    const handleNotification = (donorId) => {
        console.log("Notify donor with ID:", donorId);
        // Add logic to notify the donor, for example, send an email or SMS
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Matching Donors</h2>
            {donors.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No matching donors found.</p>
            ) : (
                <ul className="space-y-4">
                    {donors.map((donor) => (
                        <li key={donor.id} className="flex items-center justify-between bg-[#f8f9fa] p-4 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <p className="font-semibold text-[#1E2A38]">{donor.name}</p>
                                <p className="text-sm text-gray-500">{donor.blood_group}</p>
                                <p className="text-sm text-gray-500">Contact: {donor.contact_number}</p>
                                <p className="text-sm text-gray-500">City: {donor.city}</p>
                            </div>
                            <Link to ={'./donorsList'}>
                            
                            </Link>
                            <button
                                onClick={() => handleNotification(donor.id)}
                                className="bg-[#DC143C] hover:bg-red-700 text-white py-2 px-4 rounded-full transition duration-300"
                            >
                                Notify
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchingDonorsList;
