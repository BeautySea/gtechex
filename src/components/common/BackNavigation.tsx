interface NavProps {
  text: string;
  backTo: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
// backTo='personal' setState={setPageToRender}
const BackNavigation = ({ text, backTo, setState }: NavProps) => {
  return (
    <div className="flex items-center gap-[10px] mb-[40px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        onClick={() => setState(backTo)}
      >
        <path
          d="M3.82843 7.00088H16V9.00088H3.82843L9.1924 14.3648L7.7782 15.779L0 8.00088L7.7782 0.222656L9.1924 1.63687L3.82843 7.00088Z"
          fill="#1F1F1F"
        />
      </svg>
      <span className="text-[#1F1F1F] text-base font-medium">{text}</span>
    </div>
  );
};

export default BackNavigation;
