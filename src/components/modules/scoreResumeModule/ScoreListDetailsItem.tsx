import React from 'react';
interface compProps {
  text: string;
}

const ScoreListDetailsItem = ({ text }: compProps) => {
  return (
    <div className="flex items-start justify-start gap-[4px] w-full ">
      <div className="w-4 h-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99967 14.6663C9.84061 14.6663 11.5073 13.9201 12.7137 12.7137C13.9201 11.5073 14.6663 9.84061 14.6663 7.99967C14.6663 6.15874 13.9201 4.49207 12.7137 3.28563C11.5073 2.0792 9.84061 1.33301 7.99967 1.33301C6.15874 1.33301 4.49207 2.0792 3.28563 3.28563C2.0792 4.49207 1.33301 6.15874 1.33301 7.99967C1.33301 9.84061 2.0792 11.5073 3.28563 12.7137C4.49207 13.9201 6.15874 14.6663 7.99967 14.6663Z"
            fill="#219653"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.8041 5.52827C12.0644 5.78862 12.0644 6.21073 11.8041 6.47108L7.80409 10.4711C7.54374 10.7314 7.12163 10.7314 6.86128 10.4711L4.86128 8.47108C4.60093 8.21073 4.60093 7.78862 4.86128 7.52827C5.12163 7.26792 5.54374 7.26792 5.80409 7.52827L7.33268 9.05687L10.8613 5.52827C11.1216 5.26792 11.5437 5.26792 11.8041 5.52827Z"
            fill="white"
          />
        </svg>
      </div>

      <span className="text-xs text-[#414343] font-medium inline-block">
        {text}
      </span>
    </div>
  );
};

export default ScoreListDetailsItem;
