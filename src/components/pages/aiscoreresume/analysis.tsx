import React from 'react';
import Layoutwrapper from '../../layouts/layoutwrapper';
import PageSubTitle from '../../layouts/PageSubTitle';
import ScoreResumeSidePage from '../../modules/scoreResumeModule/ScoreResumeSidePage';
import { useLocation } from 'react-router-dom';

const Analysis = () => {
  const location = useLocation();
  const analysisData = location.state && location.state.data;

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto overflow-y-auto h-auto">
          <PageSubTitle
            title="AI Score Resume"
            subTitle="Find out your resume score"
            needRoute={true}
            routeTo="ai-score-resume"
          />
          <div
            className="flex items-center justify-center  w-full  h-auto py-5"
            style={{ height: 'calc(100vh - 145px)', overflowY: 'hidden' }}
          >
            <ScoreResumeSidePage analysisData={analysisData} />
          </div>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Analysis;
