import LeftArrowIcon from '../../../../interfaces/icons/leftArrow';
import IconButton from '../shared/iconButton/iconButton';
import SecondaryButton from '../shared/secondaryButton/secondaryButton';
import styles from './subHeader.module.css';

const SubHeader = () => {
  return (
    <>
      <div className={styles.subHeader}>
        <div className={styles.left}>
          <IconButton title="Go back to Resumes List">
            <LeftArrowIcon routeTo="resumes" />
          </IconButton>
          <h4>Create AI Resume</h4>
        </div>
        <SecondaryButton>Save changes</SecondaryButton>
      </div>
    </>
  );
};

export default SubHeader;
