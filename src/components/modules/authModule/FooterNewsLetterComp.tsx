import React from 'react';

const FooterNewsLetterComp: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-md max-w-sm mx-auto md:max-w-md lg:max-w-lg">
      <h2 className="text-xl font-semibold mb-2">Sign up to our Newsletter</h2>
      <p className="text-gray-400 mb-4">
        Stay up to date with the latest news, announcements, and lots more.
      </p>
      <form className="flex flex-col sm:flex-row items-center bg-gray-800 p-2 rounded-md">
        <div className="flex items-center flex-grow mb-2 sm:mb-0 sm:mr-2">
          <span className="text-gray-400 ml-2 mr-2">📧</span>
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-transparent outline-none text-gray-300 placeholder-gray-500 flex-grow p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default FooterNewsLetterComp;
