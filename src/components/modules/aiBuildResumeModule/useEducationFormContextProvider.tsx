import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface Education {
  schoolName: string;
  certification: string;
  courseOfStudy: string;
  startDate: string;
  endDate: string;
}

interface IFormInput {
  education: Education[];
}

const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useForm<IFormInput>({
    defaultValues: {
      education: [
        {
          schoolName: '',
          certification: '',
          courseOfStudy: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormContextProvider;
