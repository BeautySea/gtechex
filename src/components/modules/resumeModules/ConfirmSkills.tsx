import { useEffect, useState } from 'react';
import useCreateResumeContext from '../../pages/resumes/createResume/useCreateResumeContext';
import Section from '../../pages/resumes/createResume/section/section';
import Fieldset from '../../pages/resumes/createResume/fieldset/fieldset';
import styles from '../../pages/resumes/createResume/skills/skills.module.css';
import SkillsTagInput from './SkillsTagInput';
import FormTextInput from '../../common/form/FormInput';

interface skillsDataDet {
  name?: string | null;
  proficiency_level?: number | null;
  years_of_experience?: number | null;
}

interface compProps {
  skillsData: skillsDataDet[];
}

const ConfirmSkills = ({ skillsData }: compProps) => {
  const { formValue } = useCreateResumeContext();
  const [skillSets, setSkillSets] = useState<any>([]);

  const [value] = useState('');

  useEffect(() => {
    formValue.current.skills = value.split(',');
  }, [formValue, value]);

  useEffect(() => {
    setSkillSets(skillsData);
  }, [skillsData]);

  const handleInputChange = () => {
    console.log('clicked');
  };

  //   console.log('skillsData', skillsData);

  return (
    <>
      <Section className={styles.personalInfo} title="Add Skills">
        <Fieldset>
          {/* <TextInput
            label="Add your skills"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          /> */}
          <div className="flex flex-col">
            <div className="flex items-center gap-[10px]">
              <div>
                <SkillsTagInput
                  setData={setSkillSets || []}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Job skills"
                />
              </div>
              <FormTextInput
                label="Years of Experience"
                name="yearsOfExperience"
                required={true}
                type="text"
                id="yearsOfExperience"
                value=""
                placeholder="0"
                onChange={handleInputChange}
              />
              <button className="border border-grey-50 flex items-center justify-center px-5 py-2 rounded-[8px]">
                Enter
              </button>
            </div>
            <div className="mb-8 mt-5">
              <ul className="flex flex-wrap">
                {skillsData.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2"
                  >
                    {skill.name}{' '}
                    <span>
                      {skill.years_of_experience === null
                        ? 0
                        : skill.years_of_experience}
                      yrs
                    </span>{' '}
                    X
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Fieldset>
      </Section>
    </>
  );
};

export default ConfirmSkills;
