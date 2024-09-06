// import React from 'react';

// interface compProps {
//   previewResumeData: any;
// }

// const ResumeTemplatePreview: React.FC<compProps> = ({ previewResumeData }) => {
//   return (
//     <>
//       {previewResumeData === null ? (
//         <div>loading...</div>
//       ) : (
//         <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded">
//           {/* Header */}
//           <div className="text-center mb-4 border-b-4 border-[#000000] pb-2">
//             <h1 className="text-sm font-medium text-[#000000]">
//               {previewResumeData?.personal_information?.full_name}
//             </h1>
//             <p className='text-sm font-medium text-[#000000]">'>
//               {previewResumeData?.personal_information?.email} |{' '}
//               {previewResumeData?.personal_information?.phone}
//             </p>
//           </div>

//           {/* Section: Objectives */}
//           <div className="mb-4">
//             <h2 className="text-sm font-semibold border-b-2 border-t-2 border-[#000000] mb-2 text-[#000000] py-1">
//               OBJECTIVES
//             </h2>
//             <p className="block px-[20px] text-[#000000] text-xs text-normal">
//               {previewResumeData?.objective}
//             </p>
//           </div>

//           {/* Section: Skills */}
//           <div className="mb-4">
//             <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
//               SKILLS
//             </h2>
//             <ul className="list-disc list-inside px-[20px] grid grid-cols-1 sm:grid-cols-1 gap-2">
//               {previewResumeData?.skills?.map((item: any) => (
//                 <li className="text-[#000000] text-sm font-normal">
//                   {item?.name}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Section: Technical Certifications & Trainings */}
//           <div className="mb-4">
//             <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
//               Technical Certifications & Trainings
//             </h2>

//             <ul className="list-disc list-inside px-[20px]">
//               {previewResumeData?.certifications?.map((item: any) => (
//                 <li className="text-[#000000] text-sm font-normal">
//                   {item?.name}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Section: Education */}
//           {/* <div className="mb-4">

//         <div className="flex justify-between">
//           <span>International Relations</span>
//           <span>Bachelor of Arts</span>
//         </div>
//       </div> */}
//           <div className="mb-4">
//             <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
//               EDUCATION
//             </h2>
//             <div className="flex flex-col">
//               {previewResumeData?.education?.map((item: any) => (
//                 <div className="flex justify-between mb-2">
//                   <span className="text-sm text-[#000000] font-normal">
//                     {item?.institution}
//                   </span>
//                   <span className="text-sm text-[#000000] font-normal">
//                     {item?.start_date} - {item?.end_date}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Section: Work Experience */}
//           <div className="mb-4">
//             <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
//               WORK EXPERIENCE
//             </h2>
//             {previewResumeData?.work_experience?.map((item: any) => (
//               <div className="mb-4 flex flex-col gap-[4px]">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-[#000000] font-semibold">
//                     {item?.company}
//                   </span>
//                   <span className="text-sm text-[#000000] font-semibold">
//                     {item?.start_date} – {item?.end_date}
//                   </span>
//                 </div>
//                 <div className="flex justify-start items-center mb-2 w-full">
//                   <span className="text-sm text-[#000000] font-normal">
//                     {item?.position}
//                   </span>
//                 </div>
//                 <ul className="list-disc list-outside px-[20px]">
//                   {item?.rewritten_responsibility?.map((resp: any) => (
//                     <li className="text-[#000000] text-sm font-normal">
//                       {resp?.responsibility}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ResumeTemplatePreview;
import React, { useRef } from 'react';

interface compProps {
  previewResumeData: any;
  resumeRef: React.RefObject<HTMLDivElement>;
  downloadPDF: () => Promise<void>;
}

const ResumeTemplatePreview: React.FC<compProps> = ({
  previewResumeData,
  resumeRef,
  downloadPDF,
}) => {
  return (
    <>
      {previewResumeData === null ? (
        <div>loading...</div>
      ) : (
        <div>
          <div
            ref={resumeRef}
            className="max-w-2xl mx-auto p-4 border border-gray-300 rounded"
          >
            {/* Header */}
            <div className="text-center mb-4 border-b-4 border-[#000000] pb-2">
              <h1 className="text-sm font-medium text-[#000000]">
                {previewResumeData?.personal_information?.full_name}
              </h1>
              <p className="text-sm font-medium text-[#000000]">
                {previewResumeData?.personal_information?.email} |{' '}
                {previewResumeData?.personal_information?.phone}
              </p>
            </div>

            {/* Section: Objectives */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold border-b-2 border-t-2 border-[#000000] mb-2 text-[#000000] py-1">
                OBJECTIVES
              </h2>
              <p className="block px-[20px] text-[#000000] text-xs text-normal">
                {previewResumeData?.objective}
              </p>
            </div>

            {/* Section: Skills */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
                SKILLS
              </h2>
              <ul className="list-disc list-inside px-[20px] grid grid-cols-1 sm:grid-cols-1 gap-2">
                {previewResumeData?.skills?.map((item: any) => (
                  <li
                    key={item?.name}
                    className="text-[#000000] text-sm font-normal"
                  >
                    {item?.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Technical Certifications & Trainings */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
                Technical Certifications & Trainings
              </h2>
              <ul className="list-disc list-inside px-[20px]">
                {previewResumeData?.certifications?.map((item: any) => (
                  <li
                    key={item?.name}
                    className="text-[#000000] text-sm font-normal"
                  >
                    {item?.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Education */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
                EDUCATION
              </h2>
              <div className="flex flex-col">
                {previewResumeData?.education?.map(
                  (item: any, index: number) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-sm text-[#000000] font-normal">
                        {item?.institution}
                      </span>
                      <span className="text-sm text-[#000000] font-normal">
                        {item?.start_date} - {item?.end_date}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Section: Work Experience */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold border-t-2  border-b border-[#000000] mb-2 text-[#000000] py-1">
                WORK EXPERIENCE
              </h2>
              {previewResumeData?.work_experience?.map(
                (item: any, index: number) => (
                  <div key={index} className="mb-4 flex flex-col gap-[4px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#000000] font-semibold">
                        {item?.company}
                      </span>
                      <span className="text-sm text-[#000000] font-semibold">
                        {item?.start_date} – {item?.end_date}
                      </span>
                    </div>
                    <div className="flex justify-start items-center mb-2 w-full">
                      <span className="text-sm text-[#000000] font-normal">
                        {item?.position}
                      </span>
                    </div>
                    <ul className="list-disc list-outside px-[20px]">
                      {item?.rewritten_responsibility?.map(
                        (resp: any, i: number) => (
                          <li
                            key={i}
                            className="text-[#000000] text-sm font-normal"
                          >
                            {resp?.responsibility}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeTemplatePreview;
