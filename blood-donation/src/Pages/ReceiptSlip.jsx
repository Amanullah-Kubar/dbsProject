// components/ReceiptSlip.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ReceiptSlip = ({ requestData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Blood_Request_${requestData.patientName}`,
  });

  return (
    <div className="bg-white text-black p-4 rounded shadow-md max-w-md mx-auto mt-6">
      <div ref={componentRef} className="p-4 border border-gray-400 rounded">
        <h2 className="text-2xl font-bold mb-2 text-center">Blood Request Receipt</h2>
        <p><strong>ID:</strong> {requestData.requestId}</p>
        <p><strong>Patient Name:</strong> {requestData.patientName}</p>
        <p><strong>Hospital:</strong> {requestData.hospital}</p>
        <p><strong>Blood Type:</strong> {requestData.bloodGroup}</p>
        <p><strong>Units Needed:</strong> {requestData.units}</p>
        <p><strong>Contact Number:</strong> {requestData.contactNumber}</p>
        <p><strong>Status:</strong> Fulfilled</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default ReceiptSlip;
