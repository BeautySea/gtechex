// import React, { useState, useEffect } from 'react';
// import CollapsibleWrapper from './CollapsibleWrapper';

// interface Education {
//   id: number;
//   institution: string;
//   degree: string;
//   field_of_study: string;
//   start_date: string;
//   end_date: string;
// }

// interface compProps {
//   educationAPIData: any;
// }

// const EducationComponent: React.FC<compProps> = ({ educationAPIData }) => {
//   const [educationList, setEducationList] = useState<Education[]>([
//     {
//       id: 1,
//       institution: '',
//       degree: '',
//       field_of_study: '',
//       start_date: '',
//       end_date: '',
//     },
//   ]);

//   const addEducation = () => {
//     const newEducation: Education = {
//       id: educationList.length + 1,
//       institution: '',
//       degree: '',
//       field_of_study: '',
//       start_date: '',
//       end_date: '',
//     };
//     setEducationList([...educationList, newEducation]);
//   };

//   const removeEducation = (id: number) => {
//     setEducationList(educationList.filter((education) => education.id !== id));
//   };

//   const handleChange = (id: number, field: keyof Education, value: string) => {
//     const updatedList = educationList.map((education) => {
//       if (education.id === id) {
//         return { ...education, [field]: value };
//       }
//       return education;
//     });
//     setEducationList(updatedList);
//   };

//   useEffect(() => {
//     setEducationList(educationAPIData);
//   }, [educationAPIData]);

//   return (
//     <CollapsibleWrapper title="Education">
//       {educationList.map((education, index) => (
//         <div key={education.id} className="mb-6 border rounded ">
//           <div className="flex justify-between items-center mb-4 bg-[#A8A8AB1F] p-4">
//             <h3 className="text-md font-semibold">School {index + 1}</h3>
//             {educationList.length > 1 && (
//               <button
//                 className="text-red-500"
//                 onClick={() => removeEducation(education.id)}
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ">
//               <div>
//                 <label className="block text-xs font-semibold text-[#131D26]">
//                   Name of School
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
//                   value={education.institution}
//                   onChange={(e) =>
//                     handleChange(education.id, 'institution', e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-[#131D26]">
//                   degree
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
//                   value={education.degree}
//                   onChange={(e) =>
//                     handleChange(education.id, 'degree', e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ">
//               <div>
//                 <label className="block text-xs font-semibold text-[#131D26]">
//                   Course of Study
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
//                   value={education.field_of_study}
//                   onChange={(e) =>
//                     handleChange(education.id, 'field_of_study', e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
//               <div>
//                 <label className="block text-xs font-semibold text-[#131D26]">
//                   Start Date
//                 </label>
//                 <input
//                   type="year"
//                   className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
//                   value={education.start_date}
//                   onChange={(e) =>
//                     handleChange(education.id, 'start_date', e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-[#131D26]">
//                   End Date
//                 </label>
//                 <input
//                   type="year"
//                   className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
//                   value={education.end_date}
//                   onChange={(e) =>
//                     handleChange(education.id, 'end_date', e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//       <button
//         className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
//         onClick={addEducation}
//       >
//         + Add School
//       </button>
//     </CollapsibleWrapper>
//   );
// };

// export default EducationComponent;

import React, { useEffect } from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';

interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
}

interface compProps {
  educationAPIData: any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: any;
}

const EducationComponent: React.FC<compProps> = ({
  educationAPIData,
  formData,
  setFormData,
  handleInputChange,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
    };
    setFormData({
      ...formData,
      education: [...formData.education, newEducation],
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter(
        (_: Education, i: number) => i !== index
      ),
    });
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      education: educationAPIData,
    }));
  }, [educationAPIData]);

  return (
    <CollapsibleWrapper title="Education">
      {formData.education.map((education: Education, index: number) => (
        <div key={index} className="mb-6 border rounded ">
          <div className="flex justify-between items-center mb-4 bg-[#A8A8AB1F] p-4">
            <h3 className="text-md font-semibold">School {index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                className="text-red-500"
                onClick={() => removeEducation(index)}
              >
                Remove
              </button>
            )}
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ">
              <div>
                <label className="block text-xs font-semibold text-[#131D26]">
                  Name of School
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
                  value={education.institution}
                  name="institution"
                  onChange={(e) => handleInputChange('education', e, index)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#131D26]">
                  Degree
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
                  value={education.degree}
                  name="degree"
                  onChange={(e) => handleInputChange('education', e, index)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ">
              <div>
                <label className="block text-xs font-semibold text-[#131D26]">
                  Course of Study
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
                  value={education.field_of_study}
                  name="field_of_study"
                  onChange={(e) => handleInputChange('education', e, index)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div>
                <label className="block text-xs font-semibold text-[#131D26]">
                  Start Date
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
                  value={education.start_date}
                  name="start_date"
                  onChange={(e) => handleInputChange('education', e, index)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#131D26]">
                  End Date
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
                  value={education.end_date}
                  name="end_date"
                  onChange={(e) => handleInputChange('education', e, index)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
        onClick={addEducation}
      >
        + Add School
      </button>
    </CollapsibleWrapper>
  );
};

export default EducationComponent;
