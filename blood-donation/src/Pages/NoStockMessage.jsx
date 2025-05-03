// components/NoStockMessage.js
import React from 'react';

const NoStockMessage = ({ bloodType }) => (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow-md mt-6 text-center max-w-md mx-auto">
    <h2 className="text-xl font-bold mb-2">Out of Stock</h2>
    <p>Sorry, we currently have no available units for <strong>{bloodType}</strong>.</p>
    <p>Please check back later or try a different blood type.</p>
  </div>
);

export default NoStockMessage;
