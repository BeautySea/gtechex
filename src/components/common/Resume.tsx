import React from 'react';

interface ResumeProps {
  data: {
    personal_info: {
      full_name: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string | null;
      personal_website: string;
    };
    education: Array<{
      institution: string;
      degree: string;
      field_of_study: string;
      start_date: string;
      end_date: string | null;
      gpa: number | null;
    }>;
    work_experience: Array<{
      company: string;
      position: string;
      start_date: string;
      end_date: string | null;
      responsibilities: string[];
    }>;
    skills: Array<{
      name: string;
      proficiency_level: string | null;
      years_of_experience: number;
    }>;
  };
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  const { personal_info, education, work_experience, skills } = data;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Personal Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{personal_info.full_name}</h1>
        <p className="text-gray-600">
          {personal_info.email} | {personal_info.phone}
        </p>
        <p className="text-gray-600">{personal_info.address}</p>
        {personal_info.linkedin && (
          <p className="text-blue-500">
            LinkedIn:{' '}
            <a
              href={personal_info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {personal_info.linkedin}
            </a>
          </p>
        )}
        <p className="text-blue-500">
          Website:{' '}
          <a
            href={personal_info.personal_website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {personal_info.personal_website}
          </a>
        </p>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">
              {edu.degree} in {edu.field_of_study}
            </p>
            <p>{edu.institution}</p>
            <p>
              {edu.start_date} - {edu.end_date || 'Present'}
            </p>
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Work Experience</h2>
        {work_experience.map((job, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">
              {job.position} at {job.company}
            </p>
            <p>
              {job.start_date} - {job.end_date || 'Present'}
            </p>
            <ul className="list-disc pl-6">
              {job.responsibilities.map((responsibility, i) => (
                <li key={i}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <ul className="flex flex-wrap">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2"
            >
              {skill.name} <span>{skill.years_of_experience}yrs</span> X
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resume;
