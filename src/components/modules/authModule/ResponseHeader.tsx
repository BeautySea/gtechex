import React from 'react';

const ResponseHeader: React.FC = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-4" />
        <h1 className="text-gray-900 text-lg font-bold">Your Logo</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-container relative">
        <div className="bg-gray-900 absolute top-0 left-0 right-0 bottom-0 transform skew-y-6 -z-1"></div>
        <ul className="flex space-x-6 text-white relative z-10">
          <li>Home</li>
          <li>Pricing</li>
          <li>FAQ</li>
        </ul>
      </nav>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Login
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
          Create Account
        </button>
      </div>
    </header>
  );
};

export default ResponseHeader;
