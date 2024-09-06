import {
  ChangeEvent,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useCreateResumeContext from '../../pages/resumes/createResume/useCreateResumeContext';
import Fieldset from '../../pages/resumes/createResume/fieldset/fieldset';
import TextInput from '../../pages/resumes/createResume/shared/textInput/textInput';
import TextArea from '../../pages/resumes/createResume/shared/textArea/textArea';
import getRandomId from '../../../utils/getRandomId';
import Section from '../../pages/resumes/createResume/section/section';
import FormButton from '../../pages/resumes/createResume/shared/formButton/formButton';
import styles from '../../pages/resumes/createResume/personalInfo/personalInfo.module.css';
import FormTextInput from '../../common/form/FormInput';
// import QuillStyle from '@styles/QuillEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomLabel from '../../common/Label';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: ['#fff'] }],
    [{ align: [] }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background',
];

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//     ssr: false,
//     loading: () => <p>Loading ...</p>,
//   });

interface expData {
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
}

interface ExpCardProps {
  id: string;
  workExperienceData?: expData;
}

interface ConfirmProps {
  workExperience: expData[];
}

interface RenderListProps {
  items: string[];
}

const RenderList: React.FC<RenderListProps> = ({ items }) => {
  return (
    <textarea readOnly className="border p-2" rows={items.length + 1}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && '\n'}- {item}
        </Fragment>
      ))}
    </textarea>
  );
};

const ExpCard = ({ id, workExperienceData }: ExpCardProps) => {
  const { formValue } = useCreateResumeContext();
  const [values, setValues] = useState<any>({
    companyName: '',
    description: [],
    endDate: '',
    role: '',
    startDate: '',
    skills: '',
  });

  function convertToLiElements(stringArray: string[]): string {
    const stringArr = stringArray.map((str) => `<li>${str}</li>`);
    return stringArr.join('\n');
  }

  const convertToHTMLList = (items: string[]) => {
    const listItems = items.map((item) => `<li>${item}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  };

  useEffect(() => {
    formValue.current.experience = [
      {
        id: id,
        ...values,
      },
    ];
  }, [formValue, id, values, workExperienceData]);

  // console.log('values', workExperienceData);

  useEffect(() => {
    setValues({
      companyName: workExperienceData?.company || '',
      endDate: workExperienceData?.end_date || '',
      startDate: workExperienceData?.start_date || '',
      role: workExperienceData?.position || '',
      description:
        convertToHTMLList(workExperienceData?.responsibilities || []) || [],
      // convertToLiElements( || []) || [],
    });
  }, [workExperienceData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleQuilEditorChange = (value: any) => {
    // setReasons(value);
    setValues({ ...values, description: value });
  };

  // console.log('description', values.description);

  return (
    <>
      <div
        className={`${styles.experience} border-b border-[#9B9B9B] pb-5 mb-5`}
      >
        <Fieldset>
          {/* <TextInput
            label="Company name"
            name='company'
            onChange={(e) =>
              setValues((prev) => ({ ...prev, companyName: e.target.value }))
            }
            value={values.companyName}
          /> */}
          <FormTextInput
            label="Company name"
            name="companyName"
            required={true}
            type="text"
            id="firstName"
            value={values.companyName}
            placeholder="Company name"
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset>
          <TextInput
            label="Role"
            onChange={(e) =>
              setValues((prev: any) => ({ ...prev, role: e.target.value }))
            }
            value={values.role}
          />
        </Fieldset>
        <Fieldset>
          {/* <TextArea
            label="Tell us about your experience and achievements here"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
            value={values.description}
          /> */}

          <div editor-quill="true" className="flex flex-col h-auto my-10">
            <CustomLabel
              htmlFor="description"
              text="Tell us about your experience and achievements here"
              className="text-[#5F5F5F] text-base font-medium"
            />
            <ReactQuill
              defaultValue={values.description}
              value={values.description}
              formats={quillFormats}
              modules={modules}
              placeholder="Tell us about your experience and achievements here"
              onChange={handleQuilEditorChange}
              className={
                'block p-2.5 w-full text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }
              theme="snow"
            />
          </div>
        </Fieldset>
        <Fieldset>
          <TextInput
            label="Starting date"
            onChange={(e) =>
              setValues((prev: any) => ({ ...prev, startDate: e.target.value }))
            }
            value={values.startDate}
          />
          <TextInput
            label="Ending date"
            onChange={(e) =>
              setValues((prev: any) => ({ ...prev, endDate: e.target.value }))
            }
            value={values.endDate}
          />
        </Fieldset>
        {/* <Fieldset>
          <TextInput
            label="Skills"
            onChange={(e) =>
              setValues((prev: any) => ({ ...prev, skills: e.target.value }))
            }
            value={values.skills}
          />
        </Fieldset> */}
      </div>
    </>
  );
};

const DEFAULT_ID = getRandomId();

const ConfirmExperience = ({ workExperience }: ConfirmProps) => {
  const [experiences, setExperiences] = useState<ReactNode[]>([
    // <ExpCard
    //   id={DEFAULT_ID}
    //   key={DEFAULT_ID}
    //   workExperience={workExperience}
    // />,
    workExperience.map((experience, index) => (
      <ExpCard
        key={index}
        id={`expCard_${index}`}
        workExperienceData={experience}
      />
    )),
  ]);

  const addExperience = useCallback(() => {
    setExperiences((prev) => {
      const id = getRandomId();
      prev.push(<ExpCard id={id} key={id} />);
      return [...prev];
    });
  }, []);

  // console.log('workExperience', workExperience);

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

export default ConfirmExperience;
