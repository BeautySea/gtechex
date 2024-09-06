interface tabProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  count: any;
  linkedInCount: number;
  indeedCount: number;
  diceCount: number;
}

const JobListingTab = ({
  setActiveTab,
  activeTab,
  count,
  linkedInCount,
  indeedCount,
  diceCount,
}: tabProps) => {
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-base font-medium text-center text-[#5F5F5F] bg-[#FFFFFF] w-full">
      <ul className="flex flex-wrap -mb-px">
        <li
          className={`me-2 inline-block px-4 py-1 cursor-pointer ${
            activeTab === 'All'
              ? 'text-[#131D26] border-b-4 border-[#131D26] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('All')}
        >
          All applications (
          {count?.data?.records ? count?.data?.records?.length : 0})
        </li>
        <li
          className={`me-2 inline-block px-4 py-1 hover:text-gray-600  cursor-pointer ${
            activeTab === 'linkedIn'
              ? 'text-[#131D26] border-b-4 border-[#131D26] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('linkedIn')}
        >
          LinkedIn ({linkedInCount})
        </li>
        <li
          className={`me-2 inline-block px-4 py-1 hover:text-gray-600  cursor-pointer ${
            activeTab === 'indeed'
              ? 'text-[#131D26] border-b-4 border-[#131D26] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('indeed')}
        >
          Indeed ({indeedCount})
        </li>
        <li
          className={`me-2 inline-block px-4 py-1 hover:text-gray-600  cursor-pointer ${
            activeTab === 'dice'
              ? 'text-[#131D26] border-b-4 border-[#131D26] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('dice')}
        >
          Dice ({diceCount})
        </li>
      </ul>
    </div>
  );
};

export default JobListingTab;
