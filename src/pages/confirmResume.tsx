import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Achievements from '../components/pages/resumes/createResume/achievements/achievements';
import Language from '../components/pages/resumes/createResume/language/language';
import Miscellaneous from '../components/pages/resumes/createResume/miscellaneous/miscellaneous';
import SecondaryButton from '../components/pages/resumes/createResume/shared/secondaryButton/secondaryButton';
import styles from '../components/pages/resumes/createResume/createResume.module.css';
import useCreateResumeContext from '../components/pages/resumes/createResume/useCreateResumeContext';
import CreateResumeProvider from '../components/pages/resumes/createResume/provider';
import ConfirmPersonalInfo from '../components/modules/resumeModules/ConfirmPersonalInfo';
import ConfirmExperience from '../components/modules/resumeModules/ConfirmExperience';
import ConfirmSkills from '../components/modules/resumeModules/ConfirmSkills';

// interface compProps {
//   resumeDatas: ResumeData | null;
// }

const ConfirmResumeForms = () => {
  const { isSubmitting, submitForm } = useCreateResumeContext();
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const resumeData = location.state && location.state.data;

  return (
    <div>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles.main}>
          <ConfirmPersonalInfo personalInfo={resumeData?.personal_info} />
          {/* <Experience />  workExp*/}
          {/* <ConfirmExperience
            workExperience={resumeData?.work_experience || []}
          /> */}
          <ConfirmExperience
            workExperience={resumeData?.work_experience || []}
          />
          <ConfirmSkills skillsData={resumeData?.skills || []} />
          <Achievements />
          <Language />
          <Miscellaneous />
          <SecondaryButton
            className={styles.submitButton}
            loading={isSubmitting}
            type="submit"
          >
            Create resume
          </SecondaryButton>
        </div>
        {/* <Templates /> */}
      </form>
    </div>
  );
};

const ConfirmResume = () => {
  const [rendered, setRendered] = useState(true);
  //   const location = useLocation();
  //   const dataFromPreviousPage = location.state?.data;

  const reload = () => {
    setRendered(() => false);
    setTimeout(() => {
      setRendered(() => true);
    }, 0);
  };

  return (
    rendered && (
      <CreateResumeProvider reload={reload}>
        <ConfirmResumeForms />
      </CreateResumeProvider>
    )
  );
};

export default ConfirmResume;
