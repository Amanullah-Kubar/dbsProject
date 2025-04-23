import React from 'react';
import '../index.css'; // Import your CSS file here
import { FaTint, FaHandHoldingMedical, FaBriefcaseMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const features = [
  {
    title: 'Register Donor',
    icon: <FaTint className="text-[#DC143C] w-10 h-10" />,
    bg: '#FFFFFF',
    buttonText: 'Register Donor',
    link:'/DonorRegistrationForm',
  },
  {
    title: 'Patient Request',
    icon: <FaHandHoldingMedical className="text-[#DC143C] w-10 h-10" />,
    bg: '#FFFFFF',
    buttonText: 'Patient Request',
    link:'/PatientRequestForm',
  },
  {
    title: 'Inventory',
    icon: <FaBriefcaseMedical className="text-[#DC143C] w-10 h-10" />,
    bg: '#FFFFFF',
    buttonText: 'Inventory',
    link:'/InventoryDashboard',
  },
];

const LandingPage = () => {
  return (
    <div className="bg-[#DC143C] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center text-white max-w-6xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 tracking-wide">
          Blood Donation Management System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1E2A38] rounded-2xl shadow-lg p-6 w-72 flex flex-col items-center transition-transform hover:scale-105 duration-300 hover:shadow-2xl hover:bg-[#2E3B4E]"
            >
              <div
                className="rounded-full p-4 mb-4 flex items-center justify-center"
                style={{ backgroundColor: feature.bg }}
              >
                {feature.icon}
              </div>
              <Link to={feature.link}>
              <button 
              className="mt-4 bg-[#4CAF50] text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                {feature.buttonText}
              </button>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
