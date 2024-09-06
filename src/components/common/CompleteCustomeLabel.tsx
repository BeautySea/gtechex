interface LabelProps {
  htmlFor: string;
  text: string;
  className: string;
  required?: boolean;
}

const CompleteCustomeLabel = ({
  htmlFor,
  text,
  className,
  required = false,
}: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {text}{' '}
      {required ? (
        <span className="text-[#EB5757]">*</span>
      ) : (
        <span className="text-[#5A5C5D]">(Optional)</span>
      )}
    </label>
  );
};

export default CompleteCustomeLabel;
