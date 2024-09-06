import React from 'react';

interface compProps {
  path: string;
  fileName: string;
}

const DownloadResume = ({ path, fileName }: compProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = path;
    link.target = '_blank';
    link.setAttribute('download', `${fileName}`);

    link.click();

    // Cleanup
    URL.revokeObjectURL(link.href);
  };
  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center justify-center gap-[4px] rounded p-2 text-xs font-normal leading-4 w-auto bg-[#A8A8AB33] text-[#414343] hover:bg-[#131D26] hover:text-[#ffffffcc] cursor-pointer"
    >
      {' '}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.67734 5.25H8.74984V2.33333C8.74984 2.0125 8.48734 1.75 8.1665 1.75H5.83317C5.51234 1.75 5.24984 2.0125 5.24984 2.33333V5.25H4.32234C3.80317 5.25 3.54067 5.88 3.90817 6.2475L6.58567 8.925C6.81317 9.1525 7.18067 9.1525 7.40817 8.925L10.0857 6.2475C10.4532 5.88 10.1965 5.25 9.67734 5.25ZM2.9165 11.0833C2.9165 11.4042 3.179 11.6667 3.49984 11.6667H10.4998C10.8207 11.6667 11.0832 11.4042 11.0832 11.0833C11.0832 10.7625 10.8207 10.5 10.4998 10.5H3.49984C3.179 10.5 2.9165 10.7625 2.9165 11.0833Z"
          fill="#414343"
        />
      </svg>
      Download
    </button>
  );
};

export default DownloadResume;
