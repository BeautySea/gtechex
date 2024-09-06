import MobileLogo from '../../../assets/mobileLogo.png';
import Layoutwrapper from '../layoutwrapper';

const MobileNav = () => {
  return (
    <Layoutwrapper>
      <div className="flex items-end justify-between h-[10vh] md:hidden w-full max-w-screen-xl mx-auto">
        <img src={MobileLogo} alt="moile logo" />

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
              fill="#5F5F5F"
            />
          </svg>
        </div>
      </div>
      {/* nav content */}
      <div className="flex flex-col justify-start">
        <ul className="flex flex-col gap-[33px]">
          <li>Overview</li>
          <li>Jobs applied</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div></div>
      </div>
    </Layoutwrapper>
  );
};

export default MobileNav;
