import React from 'react';

interface compProps {
  className: string;
  title: string;
  price: string;
  isFree?: boolean;
  yearlyPrice?: string;
  togledPlan?: string;
  discountPricePerMonth?: string;
}

const ProfilePriceTitle = ({
  className,
  title,
  price,
  yearlyPrice,
  togledPlan,
  discountPricePerMonth,
  isFree = false,
}: compProps) => {
  return (
    <div className={`${className} space-y-0.5 border-b border-[#E5E6EC] px-3`}>
      {isFree ? (
        <h3 className="text-xs text-[#131D26] font-medium">{title}</h3>
      ) : togledPlan === 'Yearly' ? (
        <div className="flex items-center justify-center gap-[8px] w-fit">
          <h3 className="text-xs text-[#131D26] font-medium">{title}</h3>
          <span className="block py-[2px] px-[4px] bg-[#BCE0CB] rounded text-[10px] text-[#186D3C] font-semibold">
            -10%
          </span>
          <span className="text-[10px] text-[#186D3C] font-bold">
            Save $300
          </span>
        </div>
      ) : (
        <h3 className="text-xs text-[#131D26] font-medium">{title}</h3>
      )}

      <p className="text-base lg:text-[20px] text-[#131D26] font-bold">
        {title === 'Standard Plan' && togledPlan === 'Yearly'
          ? yearlyPrice
          : title === 'Premium Plan' && togledPlan === 'Yearly'
          ? yearlyPrice
          : price}
      </p>
      {/* <p className="text-xs text-[#414343] font-medium leading-5">
          {togledPlan === 'Yearly' ? 'Per year' : 'Per month'}
        </p> */}
      {isFree ? null : togledPlan === 'Yearly' ? (
        <div className="w-full flex items-center justify-between">
          <p className="text-xs text-[#414343] font-medium leading-5">
            Per year
          </p>
          <p className="text-xs font-normal text-[#131D26]">
            <span className="font-bold">${discountPricePerMonth}</span>/month
          </p>
        </div>
      ) : (
        <p className="text-xs text-[#414343] font-medium leading-5">
          Per month
        </p>
      )}
    </div>
  );
};

export default ProfilePriceTitle;
