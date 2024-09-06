import React from 'react';
import style from './spinner.module.css';

const Spinner = () => {
  return (
    <div className="lg:w-[256px] rounded h-[134px] bg-[#fff] flex items-center justify-center mx-auto">
      <div className={style.loader}></div>
    </div>
  );
};

export default Spinner;
