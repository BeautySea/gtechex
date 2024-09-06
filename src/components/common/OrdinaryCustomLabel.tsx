interface LabelProps {
  htmlFor: string;
  text: string;
  className: string;
}

const OrdinaryCustomLabel = ({ htmlFor, text, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {text}{' '}
    </label>
  );
};

export default OrdinaryCustomLabel;
