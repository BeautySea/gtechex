import React from 'react';

const JobTitlesCompoent = () => {
  const jobTitles = [
    'Software Engineer',
    'Architect',
    'Quantity Surveyor',
    'Product Designer',
    'Physicist',
    'Data Analyst',
    'Web3 Instructor',
    'Smart Contract Developer',
    'Web3 Designer',
    'Python Developer',
    'DevOps Engineer',
    'UI Designer',
    'Developer Relations Manager',
    'Graphics Designer',
    'Brand Designer',
    'UX Designer',
    'Software Engineer',
    'Full-Stack Developer',
    'Senior Accountant',
    'Criminal Lawyer',
    'Software Engineer',
    'Content Writer',
  ];
  return (
    <div className="bg-[#fff] w-full">
      <div className="flex flex-wrap justify-center p-4 w-full mx-auto gap-[8px]">
        {jobTitles.map((title, index) => (
          <div
            key={index}
            className="text-[#131D26] text-[10px] border border-[#C1C1C3] rounded-[4px] font-medium px-3 py-2  text-center transition duration-300 transform hover:-translate-y-1"
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTitlesCompoent;
