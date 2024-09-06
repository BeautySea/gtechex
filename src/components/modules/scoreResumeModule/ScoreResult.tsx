import React from 'react';
import BorderWrapper from '../../common/BorderWrapper';
import ScoreListDetailsItem from './ScoreListDetailsItem';
import { roundToNearestDecimal } from '../../../utils/utilFucntions';
import ScoreDetailsItemNegative from './ScoreDEetailsItemNegative';

interface compProps {
  // toggleSidePage?: boolean;
  analysisData: any;
}

const ScoreResult = ({ analysisData }: compProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[4px] w-full ">
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Email Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {analysisData?.email_score === 'Yes' ? 100 : 0}%
              </span>
            </div>

            <p className="text-xs text-[#414343] font-medium">
              Professionalism when it comes to arrangement and structure of
              Email address
            </p>
          </div>
          <div className="w-1/2">
            {analysisData?.email_score === 'Yes' ? (
              <ScoreListDetailsItem text="You provided your email as it should be." />
            ) : (
              <ScoreDetailsItemNegative text="No email found" />
            )}
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Phone Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {analysisData?.phone_score === 'Yes' ? 100 : 0}%
              </span>
            </div>

            <p className="text-xs text-[#414343] font-medium">
              Professionalism when it comes to arrangement and structure of
              Phone Number
            </p>
          </div>
          <div className="w-1/2">
            {analysisData?.phone_score === 'Yes' ? (
              <ScoreListDetailsItem text="You provided your phone number in an appropriate manner." />
            ) : (
              <ScoreDetailsItemNegative text="No phone number found" />
            )}
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              LinkedIn Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {analysisData?.linkedin_score === 'Yes' ? 100 : 0}%
              </span>
            </div>

            <p className="text-xs text-[#414343] font-medium">
              Link to your Linkedin account
            </p>
          </div>
          <div className="w-1/2">
            {analysisData?.linkedin_score === 'Yes' ? (
              <ScoreListDetailsItem text="You provided your LinkedIn Link in an appropriate manner." />
            ) : (
              <ScoreDetailsItemNegative text="No LinkedIn Link was found" />
            )}
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Keyword Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.keyword_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How well your resume matches with industry-specific keywords.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="The keywords used in your resume are direct and straight to the point " />
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              General Keyword Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.general_keyword_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Keywords relevant to your career goals e.g problem-solving
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="Relevant keywords have been used " />
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px]  justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Category Keyword
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.category_keyword_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Presence of industry-specific keywords that can make you stand
              out.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="You made use of industry-related jargon in your resume, which is awesome" />
          </div>
        </div>
      </BorderWrapper>
      {/* <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Length Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                11.2%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              The length of your resume, ensuring it is both detailed and
              concise.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="The Length of your resume is optimal" />
          </div>
        </div>
      </BorderWrapper> */}
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Job Title Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.job_title_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How well your job title aligns with your career goals.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="Your resume includes the job title you are targeting." />
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Readability Score
            </h3>

            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.readability_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How easy it is for hiring managers to read through your resume.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="Hiring Managers can easily read your resume." />
          </div>
        </div>
      </BorderWrapper>

      {/*  */}
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Keyword Stuffing Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.keyword_stuffing_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Ensuring that you haven't overused key terms, to maintain natural
              language flow.
            </p>
          </div>
          <div className="w-1/2">
            <ScoreListDetailsItem text="Your resume hasn’t used too much keywords, which is good." />
          </div>
        </div>
      </BorderWrapper>
      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Category Keyword Stuffing Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              {roundToNearestDecimal(
                analysisData?.category_keyword_stuffing_score
              ) < 0 ? (
                <span className="text-base text-[#EB5757] font-medium">
                  {roundToNearestDecimal(
                    analysisData?.category_keyword_stuffing_score
                  )}
                  %
                </span>
              ) : (
                <span className="text-base text-[#131D26] font-medium">
                  {roundToNearestDecimal(
                    analysisData?.category_keyword_stuffing_score
                  )}
                  %
                </span>
              )}
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Ensuring that you haven't overused key terms, to maintain natural
              language flow.
            </p>
          </div>
          <div className="w-1/2">
            {roundToNearestDecimal(
              analysisData?.category_keyword_stuffing_score
            ) < 0 ? (
              <ScoreDetailsItemNegative text="You used a bit more category keywords" />
            ) : (
              <ScoreListDetailsItem text="Your resume hasn’t used too much keywords, which is good." />
            )}
          </div>
        </div>
      </BorderWrapper>

      <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Contact Info
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                {roundToNearestDecimal(analysisData?.contact_info_score)}%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Professionalism when it comes to arrangement and structure of
              contact details
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-[4px]">
            <ScoreListDetailsItem text="You provided your phone number in an appropriate manner." />
            <ScoreListDetailsItem text="You provided your email as it should be." />
            <ScoreListDetailsItem text="You provided your physical address." />
          </div>
        </div>
      </BorderWrapper>
      {/* <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Formatting & Structure
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                11.2%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How well your resume matches with industry-specific keywords.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-[4px]">
            <ScoreListDetailsItem text="Your resume follows the exact structure a resume should have" />
          </div>
        </div>
      </BorderWrapper> */}
      {/* <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Section Headings
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                11.2%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How easy it is for hiring managers to navigate relevant sections
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-[4px]">
            <ScoreListDetailsItem text="We found the work experience section in your resume." />
            <ScoreListDetailsItem text="We found the education section in your resume." />
            <ScoreListDetailsItem text="We also found all other necessary sections." />
          </div>
        </div>
      </BorderWrapper> */}
      {/* <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Date Formatting
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                11.2%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              How well your resume matches with industry-specific keywords.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-[4px]">
            <ScoreListDetailsItem text="The dates in your work experience section are properly formatted." />
          </div>
        </div>
      </BorderWrapper> */}
      {/* <BorderWrapper bg="#fff">
        <div className="flex w-full lg:w-[682px] justify-between gap-[8px]">
          <div className="flex flex-col w-1/2 gap-[4px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              Buzzword Score
            </h3>
            <div className="flex items-center justify-start bg-[#A8A8AB33] rounded py-1.5 px-3 ">
              <span className="text-base text-[#131D26] font-medium">
                11.2%
              </span>
            </div>
            <p className="text-xs text-[#414343] font-medium">
              Presence of industry buzzwords that can make you stand out.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-[4px]">
            <ScoreListDetailsItem text="You made use of industry jargon in your resume, which is awesome" />
          </div>
        </div>
      </BorderWrapper> */}
    </div>
  );
};

export default ScoreResult;
