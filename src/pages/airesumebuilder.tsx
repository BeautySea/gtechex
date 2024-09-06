import React, { useState } from 'react';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import PageSubTitle from '../components/layouts/PageSubTitle';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import BuildResume from '../components/pages/aibuildresume/BuildResume';
import ResumeBuilderPage from '../components/pages/aibuildresume/ResumeBuilderPage';
import SelectResumeTemplateComponent from '../components/modules/aiBuildResumeModule/SelectResumeTemplateComponent';

const Airesumebuilder = () => {
  const [isLoading, setIsloading] = useState(false);
  const [resumeDets, setResumeDets] = useState({
    resName: '',
    resID: '',
  });
  type nextUIType = 'init' | 'build' | 'select template';

  const [currentPage, setCurrentPage] = useState<
    'init' | 'build' | 'select template'
  >('init');

  const handleNextUIToRender = (nextUI: nextUIType) => {
    setIsloading(true);

    setCurrentPage(nextUI);
    // setTimeout(() => {
    // }, 3000);
  };

  console.log('currentPage', currentPage);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto overflow-y-auto h-auto">
          {currentPage === 'init' && (
            <>
              <PageSubTitle
                title="AI Resume Builder"
                subTitle="Build your professional resume with our AI"
                needRoute={false}
              />
              <InnerLayoutWrapper>
                <div
                  className="flex items-center flex-col lg:justify-between  w-full h-auto gap-[60px]"
                  // style={{ height: 'calc(100vh - 145px)', overflowY: 'hidden' }}
                >
                  <BuildResume handleNextUIToRender={handleNextUIToRender} />
                </div>
              </InnerLayoutWrapper>
            </>
          )}
          {currentPage === 'select template' && (
            <SelectResumeTemplateComponent
              handleNextUIToRender={handleNextUIToRender}
              setResumeDets={setResumeDets}
            />
          )}
          {currentPage === 'build' && (
            <ResumeBuilderPage resumeDets={resumeDets} />
          )}
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Airesumebuilder;
