interface inputProps {
  avatar: any;
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  disable?: boolean;
  otherHandler?: any;
  handleClickOut?: any;
  ref?: any;
  changeHadler?: (e: any) => void;
  value?: any;
}

const InputWithAvatar = ({
  avatar,
  placeholder,
  type,
  name,
  required,
  otherHandler,
  ref,
  disable,
  changeHadler,
  handleClickOut,
  value,
}: inputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        {avatar}
      </div>
      <input
        type={type}
        id={name}
        ref={ref}
        name={name}
        className={`block w-full px-4 py-2 ps-10 text-sm text-[#131d26] border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#E5E6EC] focus:border-[#E5E6EC] placeholder:text-[#414343] placeholder:font-normal placeholder:text-sm ${
          disable ? 'bg-[#F2F2F2]' : 'bg-[#fff]'
        } ${disable === true ? 'cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={changeHadler}
        onClick={otherHandler}
        onBlur={handleClickOut}
        disabled={disable}
      />
    </div>
  );
};

export default InputWithAvatar;
