import { useState } from 'react';
import Achievements from './achievements/achievements';
import Experience from './experience/experience';
import Language from './language/language';
import Miscellaneous from './miscellaneous/miscellaneous';
import PersonalInfo from './personalInfo/personalInfo';
import SecondaryButton from './shared/secondaryButton/secondaryButton';
import Skills from './skills/skills';
import SubHeader from './subHeader/subHeader';
import Templates from './templates/templates';
import styles from './createResume.module.css';
import CreateResumeProvider from './provider';
import useCreateResumeContext from './useCreateResumeContext';
import ResumeLimitModal from './ResumeLimitModal';

const CreateResumeConsumer = () => {
  const { isSubmitting, submitForm } = useCreateResumeContext();
  const [resumeLimitModal, setResumeLimitModal] = useState(false);
  const resumeLength = 5;

  const handleToggleResumeLimitModal = () => {
    console.log('clicked');

    if (resumeLength === 5) {
      setResumeLimitModal(!resumeLimitModal);
    }
  };

  return (
    <>
      <div className={styles.createResume}>
        <SubHeader />
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.main}>
            <PersonalInfo />
            <Experience />
            <Skills />
            <Achievements />
            <Language />
            <Miscellaneous />
            <SecondaryButton
              onClick={handleToggleResumeLimitModal}
              className={`${styles.submitButton} w-1/2 flex items-center justify-center py-[20px] px-[10px] text-base font-medium 2xl:w-[392px] rounded-[4px] bg-[#131D26] text-[#F6D155] mx-auto`}
              loading={isSubmitting}
              // type="submit"
              type="button"
            >
              Create resume
            </SecondaryButton>
          </div>
          <Templates />
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      {resumeLimitModal ? (
        <ResumeLimitModal toggleModal={handleToggleResumeLimitModal} />
      ) : null}
    </>
  );
};

const CreateResume = () => {
  const [rendered, setRendered] = useState(true);

  const reload = () => {
    setRendered(() => false);
    setTimeout(() => {
      setRendered(() => true);
    }, 0);
  };

  return (
    rendered && (
      <CreateResumeProvider reload={reload}>
        <CreateResumeConsumer />
      </CreateResumeProvider>
    )
  );
};

export default CreateResume;
