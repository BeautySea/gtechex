interface compProps {
  title: string;
}

const EducationComp = ({ title }: compProps) => {
  return (
    <div className="flex flex-col gap-[16px] border border-[#E5E6EC] rounded">
      <div className="bg-[#ABABAB33] flex items-center justify-start py-[8px] px-[20px]">
        <h3 className="text-[14px] text-[#131D26] font-normal">{title}</h3>
      </div>
      <div className="px-[20px] pb-[20px] flex flex-col gap-[16px]">
        <div className="flex items-center justify-between w-[70%]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] text-[#131D26] ">Name of School</span>
            <h3 className="text-[#131D26] text-[12px] font-semibold">
              Providence College
            </h3>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] text-[#131D26] ">Certification</span>
            <h3 className="text-[#131D26] text-[12px] font-semibold">
              Senior Secondary School Certification
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationComp;
