import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReceiptSlip from './ReceiptSlip';
import NoStockMessage from './NoStockMessage';

const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


const InventoryDashboard = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [inventory, setInventory] = useState([]);
  const [requestedBloodType, setRequestedBloodType] = useState('');
  const [requestedUnits, setRequestedUnits] = useState(1);
  const [patientName, setPatientName] = useState('');
  const [hospital, setHospital] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [noStock, setNoStock] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/inventory');
        setInventory(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError('Failed to load inventory data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredData =
    selectedType === 'All'
      ? inventory
      : inventory.filter((sample) => sample.blood_type === selectedType);

  const getTotalUnitsByType = (type) =>
    inventory
      .filter((s) => s.blood_type === type)
      .reduce((sum, s) => sum + s.units, 0);

  const handleRequestBlood = async () => {
    setMessage('');
    setSuccessData(null);
    setNoStock(false);

    if (!requestedBloodType) {
      setMessage('Please select a blood type to request.');
      return;
    }

    if (!patientName || !hospital || !contactNumber) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const availableUnits = inventory
      .filter(item => item.blood_type === requestedBloodType)
      .reduce((sum, item) => sum + item.units, 0);

    if (availableUnits < requestedUnits) {
      setNoStock(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/blood-request', {
        bloodGroup: requestedBloodType,
        units: requestedUnits,
        patientName,
        hospital,
        contactNumber
      });

      const updatedInventory = await axios.get('http://localhost:5000/api/inventory');
      setInventory(updatedInventory.data);

      await axios.post('http://localhost:5000/api/update_status', {
        requestId: response.data.requestId,
        status: 'Fulfilled'
      });

      setSuccessData({
        requestId: response.data.requestId,
        bloodGroup: requestedBloodType,
        units: requestedUnits,
        patientName,
        hospital,
        contactNumber
      });

      setRequestedBloodType('');
      setRequestedUnits(1);
      setPatientName('');
      setHospital('');
      setContactNumber('');
      setStatus('Fulfilled');
    } catch (err) {
      console.error('Error requesting blood:', err);
      setMessage(err.response?.data?.error || 'Failed to submit blood request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#DC143C] p-6 text-white font-sans flex items-center justify-center">
        <div className="text-2xl">Loading inventory data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#DC143C] p-6 text-white font-sans flex items-center justify-center">
        <div className="text-2xl text-red-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DC143C] p-6 text-white font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
        Inventory Dashboard
      </h1>

      <div className="bg-[#1E2A38] p-6 rounded-2xl mb-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Request Blood</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Blood Type</label>
            <select
              value={requestedBloodType}
              onChange={(e) => setRequestedBloodType(e.target.value)}
              className="w-full p-2 rounded-md text-white bg-[#232b30] border border-gray-600 placeholder-gray-400"
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.slice(1).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Units Needed</label>
            <input
              type="number"
              min="1"
              value={requestedUnits}
              onChange={(e) => setRequestedUnits(parseInt(e.target.value))}
              className="w-full p-2 rounded-md text-white bg-[#232b36] border border-gray-600 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block mb-2">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 rounded-md text-white bg-[#232b36] border border-gray-600 placeholder-gray-400"
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block mb-2">Hospital</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full p-2 rounded-md text-white bg-[#232b36] border border-gray-600 placeholder-gray-400"
              placeholder="Enter hospital name"
            />
          </div>
          <div>
            <label className="block mb-2">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 rounded-md text-white bg-[#232b36] border border-gray-600 placeholder-gray-400"
              placeholder="Enter contact number"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRequestBlood}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-semibold transition"
          >
            Submit Request
          </button>
        </div>

        {/* Conditional UI below form */}
        {successData && <ReceiptSlip requestData={successData} />}
        {noStock && <NoStockMessage bloodType={requestedBloodType} />}
        {message && !successData && !noStock && (
          <div className="mt-4 text-lg font-medium text-center text-red-400">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
        {bloodTypes.slice(1).map((type) => (
          <div
            key={type}
            className="bg-[#1E2A38] rounded-2xl p-5 shadow-lg text-center transition hover:bg-[#2E3B4E]"
          >
            <h2 className="text-xl font-semibold mb-2">{type}</h2>
            <p className="text-3xl font-bold text-green-400">{getTotalUnitsByType(type)}</p>
            <span className="text-sm text-gray-300">Units Available</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryDashboard;
