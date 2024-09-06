import Fieldset from '../../pages/resumes/createResume/fieldset/fieldset';
import Section from '../../pages/resumes/createResume/section/section';
import Select from '../../pages/resumes/createResume/shared/select/select';
import styles from '../../pages/resumes/createResume/personalInfo/personalInfo.module.css';
import FormTextInput from '../../common/form/FormInput';
import { ChangeEvent, useEffect, useState } from 'react';

interface compProps {
  personalInfo: any;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  portFolio: string;
  phone: string;
  github: string;
  linkedin: string;
  dribbble: string;
  roleOfInterest: string;
}

const ConfirmPersonalInfo = ({ personalInfo }: compProps) => {
  const [compSate, setCompState] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    portFolio: '',
    phone: '',
    github: '',
    linkedin: '',
    dribbble: '',
    roleOfInterest: '',
  });

  useEffect(() => {
    setCompState({
      //   ...compSate,
      firstName: (personalInfo?.full_name || '').split(' ')[1] || '',
      lastName: (personalInfo?.full_name || '').split(' ')[0] || '',
      email: personalInfo?.email || '',
      portFolio: personalInfo?.port_folio || '',
      phone: personalInfo?.phone || '',
      github: personalInfo?.personal_website || '',
      linkedin: personalInfo?.linkedin || '',
      dribbble: personalInfo?.dribble || '',
      roleOfInterest: personalInfo?.role_of_interest || '',
    });
  }, [personalInfo]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompState({ ...compSate, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Section className={styles.personalInfo} title="Personal Information">
        <Fieldset>
          <FormTextInput
            label="First name"
            name="firstName"
            required={true}
            type="text"
            id="firstName"
            value={compSate.firstName}
            placeholder="first name"
            onChange={handleInputChange}
          />
          <FormTextInput
            label="Last name"
            name="lastName"
            required={true}
            type="text"
            id="lastName"
            value={compSate.lastName}
            placeholder="last name"
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput label="Email Address" name="email" /> */}
          <FormTextInput
            label="Email Address"
            name="email"
            required={true}
            type="email"
            id="email"
            value={compSate.email}
            placeholder="email address"
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput label="Phone number" name="phone" /> */}
          <FormTextInput
            label="Phone number"
            name="phone"
            required={true}
            type="tel"
            id="phone"
            value={compSate.phone}
            placeholder="phone number"
            onChange={handleInputChange}
          />
          <Select label="Gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </Fieldset>
        <Fieldset>
          <Select label="Country" name="country">
            <option value="male">Nigeria</option>
            <option value="female">Egypt</option>
            <option value="other">Lebanon</option>
          </Select>
          <Select label="State" name="state">
            <option value="male">Delaware</option>
            <option value="female">Lagos</option>
            <option value="other">Dublin</option>
          </Select>
        </Fieldset>
        <Fieldset>
          {/* <TextInput
            label="Portfolio Website"
            name="portFolio"
            placeholder="https://www.name.com"
          /> */}
          <FormTextInput
            label="Portfolio Website"
            name="portFolio"
            required={true}
            type="text"
            id="portFolio"
            value={compSate.portFolio}
            placeholder="https://www.name.com"
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput
            label="Github URL"
            name="github"
            placeholder="https://www.github.com/githubname"
          /> */}
          <FormTextInput
            label="Github URL"
            name="github"
            required={true}
            type="text"
            id="github"
            value={compSate.github}
            placeholder="https://www.github.com/githubname"
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput
            label="LinkedIn URL"
            name="linkedin"
            placeholder="https://www.linkedin.com/linkedinname"
          /> */}
          <FormTextInput
            label="LinkedIn URL"
            name="linkedin"
            placeholder="https://www.linkedin.com/linkedinname"
            required={true}
            type="text"
            id="linkedin"
            value={compSate.linkedin}
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput
            label="Dribbble URL"
            name="dribbble"
            placeholder="https://www.linkedin.com/linkedinname"
          /> */}
          <FormTextInput
            label="Dribbble URL"
            name="dribbble"
            placeholder="https://www.linkedin.com/linkedinname"
            required={true}
            type="text"
            id="dribbble"
            value={compSate.dribbble}
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextInput
            label="Role of interest"
            name="roleOfInterest"
            placeholder="Software Engineer"
          /> */}
          <FormTextInput
            label="Role of interest"
            name="roleOfInterest"
            placeholder="Software Engineer"
            required={true}
            type="text"
            id="roleOfInterest"
            value={compSate.roleOfInterest}
            onChange={handleInputChange}
          />
        </Fieldset>
      </Section>
    </>
  );
};

export default ConfirmPersonalInfo;
