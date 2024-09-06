import { ReactNode, useCallback, useEffect, useState } from 'react';
import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import FormButton from '../shared/formButton/formButton';
import TextArea from '../shared/textArea/textArea';
import TextInput from '../shared/textInput/textInput';
import styles from './experience.module.css';
import getRandomId from '../../../../../utils/getRandomId';
import useCreateResumeContext from '../useCreateResumeContext';

interface ExpCardProps {
  id: string;
}

const ExpCard = ({ id }: ExpCardProps) => {
  const { formValue } = useCreateResumeContext();
  const [values, setValues] = useState({
    companyName: '',
    description: '',
    endDate: '',
    role: '',
    startDate: '',
    skills: '',
  });

  useEffect(() => {
    formValue.current.experience = [
      {
        id: id,
        ...values,
      },
    ];
  }, [formValue, id, values]);

  return (
    <>
      <div className={styles.experience}>
        <Fieldset>
          <TextInput
            label="Company name"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, companyName: e.target.value }))
            }
            value={values.companyName}
          />
        </Fieldset>
        <Fieldset>
          <TextInput
            label="Role"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, role: e.target.value }))
            }
            value={values.role}
          />
        </Fieldset>
        <Fieldset>
          <TextArea
            label="Tell us about your experience and achievements here"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
            value={values.description}
          />
        </Fieldset>
        <Fieldset>
          <TextInput
            label="Starting date"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, startDate: e.target.value }))
            }
            value={values.startDate}
          />
          <TextInput
            label="Ending date"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, endDate: e.target.value }))
            }
            value={values.endDate}
          />
        </Fieldset>
        <Fieldset>
          <TextInput
            label="Skills"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, skills: e.target.value }))
            }
            value={values.skills}
          />
        </Fieldset>
      </div>
    </>
  );
};

const DEFAULT_ID = getRandomId();

const Experience = () => {
  const [experiences, setExperiences] = useState<ReactNode[]>([
    <ExpCard id={DEFAULT_ID} key={DEFAULT_ID} />,
  ]);

  const addExperience = useCallback(() => {
    setExperiences((prev) => {
      const id = getRandomId();
      prev.push(<ExpCard id={id} key={id} />);
      return [...prev];
    });
  }, []);

  return (
    <>
      <Section className={styles.personalInfo} title="Work Experience">
        {/* {Children.map(experiences, (child) => child)} */}
        {experiences}
        <FormButton onClick={addExperience}>Add new experience</FormButton>
      </Section>
    </>
  );
};

export default Experience;
