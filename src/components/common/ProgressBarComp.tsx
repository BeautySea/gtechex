interface compProps {
  width: number | string;
  bg: string;
  progBG?: string;
}

const ProgressBarComp = ({ width, bg, progBG = '#E5E6EC' }: compProps) => {
  return (
    <div className={`w-full bg-[${progBG}] rounded-full h-1.5`}>
      <div
        className={`bg-[${bg}] h-1.5 rounded-full `}
        style={{ width: width }}
      ></div>
    </div>
  );
};

export default ProgressBarComp;
