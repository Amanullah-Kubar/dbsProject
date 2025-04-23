import React, { useState } from 'react';

const mockData = [
  { id: 1, bloodType: 'A+', units: 12, expiryDate: '2025-05-15' },
  { id: 2, bloodType: 'O-', units: 5, expiryDate: '2025-05-20' },
  { id: 3, bloodType: 'B+', units: 8, expiryDate: '2025-06-01' },
  { id: 4, bloodType: 'AB-', units: 3, expiryDate: '2025-04-28' },
];

const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const InventoryDashboard = () => {
  const [selectedType, setSelectedType] = useState('All');

  const filteredData =
    selectedType === 'All'
      ? mockData
      : mockData.filter((sample) => sample.bloodType === selectedType);

  const getTotalUnitsByType = (type) =>
    mockData.filter((s) => s.bloodType === type).reduce((sum, s) => sum + s.units, 0);

  return (
    <div className="min-h-screen bg-[#DC143C] p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Inventory Dashboard</h1>

      {/* Summary Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {bloodTypes.slice(1).map((type) => (
          <div key={type} className="bg-[#1E2A38] p-4 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-semibold">{type}</h2>
            <p className="text-2xl mt-2">{getTotalUnitsByType(type)}</p>
            <span className="text-sm text-gray-300">Units Available</span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <label className="block text-lg font-medium mb-1">Filter by Blood Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-lg focus:outline-none"
          >
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#1E2A38] rounded-2xl shadow-lg p-4">
        <table className="w-full table-auto text-white">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-2 px-4">Blood Type</th>
              <th className="py-2 px-4">Units</th>
              <th className="py-2 px-4">Expiry Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sample) => (
              <tr key={sample.id} className="hover:bg-[#2E3B4E] transition">
                <td className="py-2 px-4">{sample.bloodType}</td>
                <td className="py-2 px-4">{sample.units}</td>
                <td className="py-2 px-4">{sample.expiryDate}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    View
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No blood samples found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDashboard;
