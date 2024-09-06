import { useNavigate } from 'react-router';

interface compProps {
  routeTo?: string;
  title: string;
  subTitle?: string;
  needRoute: boolean;
  includeButton?: boolean;
  btnClassName?: string;
  btnAction?: () => void;
  btnType?: 'submit' | 'reset' | 'button' | undefined;
  btnText?: string;
  page?: string;
}

const ComponentPageTitle = ({
  routeTo,
  title,
  subTitle,
  page,
  includeButton,
  btnClassName,
  btnType,
  btnText,
  btnAction,

  needRoute = true,
}: compProps) => {
  const navigate = useNavigate();
  const handleRouteTo = () => {
    navigate(`/${routeTo}`);
  };
  return (
    <div className="flex items-center justify-between gap-[12px] mb-[2px]">
      {needRoute ? (
        <button
          type="button"
          onClick={handleRouteTo}
          className="flex items-center justify-center bg-[#A8A8AB33] rounded-[8px] p-[8px] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={handleRouteTo}
          >
            <path
              d="M13.3333 8.1829C13.3333 8.43603 13.1451 8.64523 12.9011 8.67834L12.8333 8.6829L4.04392 8.6825L7.21924 11.8449C7.41493 12.0397 7.41561 12.3563 7.22077 12.552C7.04364 12.7299 6.7659 12.7466 6.56984 12.6018L6.51366 12.5535L2.48033 8.53748C2.45453 8.5118 2.43213 8.484 2.41311 8.45465C2.40774 8.44582 2.40228 8.43678 2.39709 8.42756C2.39233 8.41965 2.38802 8.41145 2.38396 8.40315C2.37831 8.39107 2.3728 8.3786 2.36779 8.36587C2.36372 8.35606 2.36032 8.34652 2.35722 8.3369C2.35354 8.32497 2.34996 8.31226 2.34688 8.29935C2.34459 8.29034 2.34278 8.28167 2.3412 8.27296C2.33898 8.26001 2.33708 8.2466 2.33573 8.23304C2.33457 8.22269 2.33387 8.21244 2.33348 8.20218C2.33338 8.19596 2.33325 8.18945 2.33325 8.1829L2.3335 8.16353C2.33389 8.15372 2.33456 8.14392 2.33551 8.13414L2.33325 8.1829C2.33325 8.15135 2.33617 8.12048 2.34176 8.09055C2.34306 8.0834 2.3446 8.07606 2.34631 8.06875C2.34987 8.0537 2.35397 8.03921 2.3587 8.025C2.36102 8.01794 2.36372 8.0104 2.36661 8.00291C2.37245 7.98786 2.3788 7.97352 2.38579 7.95955C2.38903 7.95298 2.39267 7.94611 2.39647 7.9393C2.40272 7.92819 2.40916 7.91764 2.41597 7.90735C2.42077 7.90007 2.42609 7.89249 2.43164 7.88504L2.43597 7.87927C2.44944 7.86167 2.46405 7.845 2.4797 7.82935L2.4803 7.82889L6.51363 3.81222C6.7093 3.61736 7.02588 3.61802 7.22074 3.81368C7.39788 3.99156 7.41344 4.26937 7.2678 4.46481L7.21927 4.52079L4.04525 7.6825L12.8333 7.6829C13.1094 7.6829 13.3333 7.90676 13.3333 8.1829Z"
              fill="black"
            />
          </svg>
        </button>
      ) : null}

      <div className="flex flex-col h-full">
        <h3
          className={`${
            page === 'overview' ? 'text-xl' : 'text-sm'
          } text-[#131D26] font-semibold leading-5`}
        >
          {title}
        </h3>
        <span className="text-xs text-[#414343]  font-medium leading-4">
          {subTitle}
        </span>
      </div>
    </div>
  );
};

export default ComponentPageTitle;
