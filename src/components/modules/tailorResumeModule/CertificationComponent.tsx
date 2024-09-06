// import React, { useState, useEffect } from 'react';
// import CollapsibleWrapper from './CollapsibleWrapper';
// import BorderWrapper from '../../common/BorderWrapper';

// type Certification = {
//   id: number;
//   name: string;
//   issuing_organization: string;
//   issue_date: string;
//   expiry_date: string;
//   certificate_link: string;
// };

// interface compProps {
//   certificationData: any;
// }

// const CertificationComponent: React.FC<compProps> = ({ certificationData }) => {
//   const [certifications, setCertifications] = useState<Certification[]>([
//     {
//       id: 1,
//       name: '',
//       issuing_organization: '',
//       issue_date: '',
//       expiry_date: '',
//       certificate_link: '',
//     },
//   ]);

//   const parseDate = (dateString: string): string => {
//     const [month, year] = dateString.split(', ');
//     const date = new Date(`${month} 1, ${year}`);
//     return date.toISOString().split('T')[0];
//   };

//   useEffect(() => {
//     const result = certificationData.map((item: any, index: number) => ({
//       id: index,
//       name: item?.name || '',
//       issuing_organization: item?.issuing_organization || '',
//       issue_date: item?.issue_date || '',
//       expiry_date: item?.expiry_date || '',
//     }));
//     setCertifications(result);
//   }, [certificationData]);

//   const handleAddCertification = () => {
//     setCertifications([
//       ...certifications,
//       {
//         id: certifications.length + 1,
//         name: '',
//         issuing_organization: '',
//         issue_date: '',
//         expiry_date: '',
//         certificate_link: '',
//       },
//     ]);
//   };

//   const handleRemoveCertification = (id: number) => {
//     setCertifications(certifications.filter((cert) => cert.id !== id));
//   };

//   const handleChange = (
//     id: number,
//     field: keyof Certification,
//     value: string
//   ) => {
//     setCertifications(
//       certifications.map((cert) =>
//         cert.id === id ? { ...cert, [field]: value } : cert
//       )
//     );
//   };

//   return (
//     <CollapsibleWrapper title="Certification">
//       {certifications.map((cert, index) => (
//         <div key={cert.id} className="mb-4 pb-4 flex items-center">
//           <BorderWrapper bg="#fff">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700">
//                   Certificate Title/Name
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={cert.name}
//                   onChange={(e) =>
//                     handleChange(cert.id, 'name', e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700">
//                   Organisation
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={cert.issuing_organization}
//                   onChange={(e) =>
//                     handleChange(
//                       cert.id,
//                       'issuing_organization',
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700">
//                   Issued Date
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={cert.issue_date}
//                   onChange={(e) =>
//                     handleChange(cert.id, 'issue_date', e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700">
//                   Expiry Date
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={cert.expiry_date}
//                   onChange={(e) =>
//                     handleChange(cert.id, 'expiry_date', e.target.value)
//                   }
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-xs font-semibold text-gray-700">
//                   Certificate Link
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={cert.certificate_link}
//                   onChange={(e) =>
//                     handleChange(cert.id, 'certificate_link', e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           </BorderWrapper>
//           {index > 0 && (
//             <button
//               onClick={() => handleRemoveCertification(cert.id)}
//               className="ml-4 text-red-500 hover:text-red-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       ))}
//       <button
//         onClick={handleAddCertification}
//         className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-[#fff]"
//       >
//         + Add Certification
//       </button>
//     </CollapsibleWrapper>
//   );
// };

// export default CertificationComponent;

import React, { useEffect } from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';
import BorderWrapper from '../../common/BorderWrapper';

type Certification = {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  certificate_link: string;
};

interface compProps {
  certificationData: Certification[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
}

const CertificationComponent: React.FC<compProps> = ({
  certificationData,
  formData,
  setFormData,
  handleInputChange,
}) => {
  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      certifications: certificationData,
    }));
  }, [certificationData, setFormData]);

  const handleAddCertification = () => {
    const newCertification: Certification = {
      name: '',
      issuing_organization: '',
      issue_date: '',
      expiry_date: '',
      certificate_link: '',
    };
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      certifications: [...prevFormData.certifications, newCertification],
    }));
  };

  const handleRemoveCertification = (index: number) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      certifications: prevFormData.certifications.filter(
        (_: Certification, idx: number) => idx !== index
      ),
    }));
  };

  return (
    <CollapsibleWrapper title="Certification">
      {formData.certifications.map((cert: Certification, index: number) => (
        <div key={index} className="mb-4 pb-4 flex items-center">
          <BorderWrapper bg="#fff">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Certificate Title/Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={cert.name}
                  onChange={(e) =>
                    handleInputChange('certifications', e, index)
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Organisation
                </label>
                <input
                  type="text"
                  name="issuing_organization"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={cert.issuing_organization}
                  onChange={(e) =>
                    handleInputChange('certifications', e, index)
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Issued Date
                </label>
                <input
                  type="text"
                  name="issue_date"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={cert.issue_date}
                  onChange={(e) =>
                    handleInputChange('certifications', e, index)
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry_date"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={cert.expiry_date}
                  onChange={(e) =>
                    handleInputChange('certifications', e, index)
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700">
                  Certificate Link
                </label>
                <input
                  type="text"
                  name="certificate_link"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={cert.certificate_link}
                  onChange={(e) =>
                    handleInputChange('certifications', e, index)
                  }
                />
              </div>
            </div>
          </BorderWrapper>
          {index > 0 && (
            <button
              onClick={() => handleRemoveCertification(index)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleAddCertification}
        className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-[#fff]"
      >
        + Add Certification
      </button>
    </CollapsibleWrapper>
  );
};

export default CertificationComponent;
