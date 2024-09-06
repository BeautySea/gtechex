import React from 'react';
import InnerLayoutWrapper from './InnerLayoutWrapper';
import ComponentPageTitle from '../common/ComponentPageTitle';

interface compProps {
  routeTo?: string;
  title: string;
  subTitle?: string;
  needRoute?: boolean;
  includeButton?: boolean;
  btnClassName?: string;
  btnAction?: () => void;

  btnType?: 'submit' | 'reset' | 'button' | undefined;
  btnText?: string;
  page?: string;
}

const PageSubTitle = ({
  routeTo,
  title,
  subTitle,
  includeButton,
  btnClassName,
  btnType,
  btnText,
  btnAction,
  page,
  needRoute = true,
}: compProps) => {
  return (
    <div className="flex items-center justify-between gap-[13px] border-b border-[#E5E6EC] h-[70px] bg-[#FFFFFF]">
      <InnerLayoutWrapper>
        <ComponentPageTitle
          title={title}
          subTitle={subTitle}
          needRoute={needRoute}
          routeTo={routeTo}
          includeButton={includeButton}
          btnClassName={btnClassName}
          btnType={btnType}
          btnText={btnText}
          btnAction={btnAction}
          page={page}
        />
      </InnerLayoutWrapper>

      {includeButton === true ? (
        <InnerLayoutWrapper>
          <button type={btnType} className={btnClassName} onClick={btnAction}>
            {btnText}
          </button>
        </InnerLayoutWrapper>
      ) : null}
    </div>
  );
};

export default PageSubTitle;
