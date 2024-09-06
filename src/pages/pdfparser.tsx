import React, { useState, ChangeEvent } from 'react';
import Resume from '../components/common/Resume';
export const resumeData = {
  personal_info: {
    full_name: 'Abdulmaleek Wasiu Shina',
    email: 'oswasiu@gmail.com',
    phone: '(+234) 090 3121 7041',
    address: '33 James Ademola Ajayi Street, Aboru Alimosho, Lagos',
    linkedin: null,
    personal_website: 'https://github.com/shina1',
  },
  education: [
    {
      institution: 'University of Ilorin, Ilorin',
      degree: 'B. Sc. Mathematics',
      field_of_study: 'Pure and Applied Mathematics',
      start_date: '2013-01-01',
      end_date: '2017-12-31',
      gpa: null,
    },
  ],
  work_experience: [
    {
      company: 'Tunga',
      position: 'Software Engineering Facilitator',
      start_date: '2023-05-01',
      end_date: null,
      responsibilities: [
        'Fostering the growth of emerging software engineers through tailored mentorship.',
        'Crafting and curating cutting-edge curriculum and training resources to empower future developers.',
      ],
    },
    {
      company: 'Sterling Bank',
      position: 'Frontend Developer',
      start_date: '2022-12-01',
      end_date: '2023-10-31',
      responsibilities: [
        'Employed NextJS and Typescript for the development and maintenance of Kudade VC, a platform that facilitates seamless collaboration between Founders and Investors',
        "Integrated multiple APIs to create seamless connections between Kudade VC's payment gateways and the banking services of our founders and investors.",
        'Elevated application performance and scalability by employing optimization techniques such as usage of pure components, lazy loading, memoization, rigorous code reviews, comprehensive code refactoring, and meticulous bug resolution.',
      ],
    },
    {
      company: 'CoLab',
      position: 'Frontend Developer',
      start_date: '2022-09-01',
      end_date: '2022-11-30',
      responsibilities: [
        'Devised innovative strategies to expedite product delivery within tight timelines.',
        "Enhanced the development workflow by aligning it with the team's strengths and capabilities.",
        'Fostered effective collaboration and communication with Project Managers and Designers to make well-timed, informed decisions.',
        'Implemented agile methodologies to ensure punctual delivery of top-notch software solutions.',
      ],
    },
    {
      company: 'Sharpy MarketPlace',
      position: 'Software Engineer',
      start_date: '2021-07-01',
      end_date: '2022-09-30',
      responsibilities: [
        'Engineered software solutions that effectively addressed user challenges, maintaining a fine balance between innovation and avoiding unnecessary complexity in an agile environment, leveraging methodologies such as Scrum.',
        "Crafted user stories that metamorphosed stakeholders' pain-points into strategic advantages, positioning them as market leaders.",
        'Collaborated seamlessly with team members to architect resilient software structures, promptly identifying and rectifying issues and deficiencies within the software solution.',
      ],
    },
    {
      company: 'Cypherdevs Technologies',
      position: 'Frontend Developer',
      start_date: '2019-12-01',
      end_date: '2021-06-30',
      responsibilities: [
        'Successfully translated several UI mockups into pixel-perfect friendly and responsive UI designs while writing scalable, maintainable, quality, and reusable codes.',
        'Develop Business Requirements and System Design Specification Documents from user stories.',
        'Worked collaboratively with Engineers, Product Designers, and Product Managers to deliver high-quality software solutions.',
      ],
    },
    {
      company: 'CodeSquad LLC',
      position: 'Software Engineer Intern',
      start_date: '2019-01-01',
      end_date: '2019-11-30',
      responsibilities: [
        'Utilized webhooks and offline first web application technologies to ensure great user experiences with minimal computing resources',
        'Develop Business Requirements and System Design Specification Documents.',
        'Utilized Agile Test and Behavioral Driven Development, Deployment, and Scaling of applications using Test Coverage and Code Quality review, embedded CI / CD pipelines and third-party cloud integrations.',
      ],
    },
  ],
  skills: [
    { name: 'JavaScript', proficiency_level: null, years_of_experience: 4 },
    { name: 'TypeScript', proficiency_level: null, years_of_experience: 3 },
    { name: 'ReactJS', proficiency_level: null, years_of_experience: 3 },
    { name: 'Redux', proficiency_level: null, years_of_experience: 3 },
    { name: 'Next.js', proficiency_level: null, years_of_experience: 2 },
    { name: 'TailwindCSS', proficiency_level: null, years_of_experience: 2 },
    { name: 'Material-UI', proficiency_level: null, years_of_experience: 3 },
  ],
  certifications: null,
  references: null,
};

const PDFParsing: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [text, setText] = useState<string>('');
  //   https://resume-to-profile-78177c32dc38.herokuapp.com/uploads/resume
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const dataBuffer = await file.arrayBuffer();
      const data = new Uint8Array(dataBuffer);
      console.log('file', file);
      setText('');
      //   console.log('data', data);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <Resume data={resumeData} />
    </div>
  );
};

export default PDFParsing;
