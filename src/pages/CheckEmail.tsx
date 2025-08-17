import React from 'react';


const CheckEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h1>
        <p className="text-gray-600 mb-6">Please check your email to find a link to activate your account.</p>
        <p className="text-gray-600 mb-8">Once activated, you can log in.</p>
        
      </div>
    </div>
  );
};

export default CheckEmail;
