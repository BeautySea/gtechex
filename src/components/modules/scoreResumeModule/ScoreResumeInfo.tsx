import React from 'react';

const ScoreResumeInfo = () => {
  return (
    <div className="flex flex-col border border-[#0077B5] p-[20px] bg-[#0077B51F] gap-[12px] rounded">
      <div className="flex flex-col gap-[12px] max-w-[421px]">
        <h2 className="text-lg text-[#131D26] font-semibold">
          Discover Your Resume Score: <br />
          Your Key To Career Success
        </h2>
        <p className="text-xs text-[#414343] font-normal">
          We have noticed a lot of folks use their resumes to get job but end up
          failing, so we devised a method of scoring an applicants resume using
          Artificial Intelligence.
        </p>
        <p className="text-xs text-[#414343] font-normal">
          As an AI tool, we calculate your resume score based on known
          professional CV formats, as well as scoring the resume with a provided
          job title.
        </p>
      </div>
      <div className="flex flex-col gap-[12px] max-w-[421px]">
        <h3 className="text-sm text-[#131D26] font-semibold">
          Here are the Criteria we consider when scoring your resume:
        </h3>
        <ul className="marker:text-[#131D26] 2xl:marker:text-[24px] list-outside list-disc ml-6 px-[12px] flex flex-col gap-[12px]">
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Keyword:</span> How
            well your resume matches with industry-specific keywords
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Length:</span> The
            length of your resume, ensuring it is both detailed and concise.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Readability:</span>{' '}
            How easy it is for hiring managers to read through your resume.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Job Title:</span> How
            well your job title aligns with your career goals.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">
              Keyword Stuffing:
            </span>{' '}
            Ensuring that you haven't overused key terms, to maintain natural
            language flow.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">
              Information & Structure:
            </span>{' '}
            How well your resume matches the standard resume structure.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">
              Section Headings:
            </span>{' '}
            How easy it is for hiring managers to navigate relevant sections.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">
              Date Formatting:
            </span>{' '}
            How well is your date structured for experience and education based
            on standard resume date structure.
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Buzzword:</span>{' '}
            Presence of industry buzzwords that can make you stand out
          </li>
          <li className="text-[#414343] text-xs font-normal">
            <span className="text-[#131D26] font-semibold">Contact:</span>Our AI
            also provides some other keywords that are useful to your resume and
            also ATS (Applicant Tracking System) keyword suggestions.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScoreResumeInfo;
