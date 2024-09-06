interface tabProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}

const ResumeTopTab = ({ setActiveTab, activeTab }: tabProps) => {
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="text-base font-medium text-center text-[#5F5F5F]">
      <ul className="flex flex-wrap -mb-px">
        <li
          className={`me-2 inline-block p-4 cursor-pointer ${
            activeTab === 'Uploaded'
              ? 'text-[#131D26] border-b-2 border-[#131D26] bg-[#9b9b9b66] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('Uploaded')}
        >
          Uploaded resume
        </li>
        <li
          className={`me-2 inline-block p-4 hover:text-gray-600  cursor-pointer ${
            activeTab === 'AI'
              ? 'text-[#131D26] border-b-2 border-[#131D26] bg-[#9b9b9b66] font-semibold text-base'
              : 'text-[#5F5F5F] border-b-2 border-transparent hover:border-gray-300 dark:hover:text-gray-300'
          } `}
          onClick={() => handleClick('AI')}
        >
          AI custom resume
        </li>
      </ul>
    </div>
  );
};

export default ResumeTopTab;
