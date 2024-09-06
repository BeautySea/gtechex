import React from 'react';

interface compProps {
  className: string;
  title: string;
  price: string;
}

const PricingCardTop = ({ className, title, price }: compProps) => {
  return (
    <div className={`${className} space-y-2`}>
      <h3 className="text-sm lg:text-[20px] text-[#131D26] font-medium">
        {title}
      </h3>
      <p className="text-base lg:text-[28px] text-[#131D26] font-bold">
        ${price}
      </p>
      <p className="text-sm text-[#131D26] font-medium leading-5">
        Per month billed annually
      </p>
    </div>
  );
};

export default PricingCardTop;
