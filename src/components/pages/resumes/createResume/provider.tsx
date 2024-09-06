import {
	FormEvent,
	FormEventHandler,
	MutableRefObject,
	ReactNode,
	createContext,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import baseAxios from '../../../../api/baseAxios';
import { convertArrayBufferToFileAndDownload } from './helpers';

interface CreateResumeValue {
	formValue: MutableRefObject<IFormValue>;
	isSubmitting: boolean;
	submitForm: FormEventHandler;
}

export const CreateResumeContext = createContext<CreateResumeValue | null>(
	null
);

interface CreateResumeProvidersProps {
	children: ReactNode;
	reload: () => void;
}

const CreateResumeProvider = ({
	children,
}: // reload,
CreateResumeProvidersProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formValue = useRef<IFormValue>(EMPTY_FORM_VALUE);

	const submitForm = useCallback(async (event: FormEvent) => {
		event.preventDefault();
		try {
			setIsSubmitting(true);
			const response = await baseAxios.post(
				'http://localhost:4000/resume',
				formValue.current
			);
			console.log(response);
			convertArrayBufferToFileAndDownload(response.data.data);
			// reload();
		} catch (error) {
			console.log(error);
		}
		setIsSubmitting(false);
	}, []);

	const createResumeValue = useMemo<CreateResumeValue>(
		() => ({
			formValue,
			isSubmitting,
			submitForm,
		}),
		[isSubmitting, submitForm]
	);

	return (
		<CreateResumeContext.Provider value={createResumeValue}>
			{children}
		</CreateResumeContext.Provider>
	);
};

export interface IFormValue {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: string;
	country: string;
	state: string;
	portFolio: string;
	github: string;
	linkedin: string;
	dribbble: string;
	roleOfInterest: string;
	experience: {
		id: string;
		companyName: string;
		role: string;
		description: string;
		startDate: string;
		endDate: string;
		skills: string;
	}[];
	skills: string[];
	achievements: {
		id: string;
		title: string;
		description: string;
	}[];
	languages: {
		id: string;
		name: string;
		score: string;
	}[];
	total: string;
	veteranStatus: string;
	disablity: string;
	willingToRelocate: string;
	race: string;
	currentSalary: string;
	expectedSalary: string;
}

const EMPTY_FORM_VALUE: IFormValue = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	gender: '',
	country: '',
	state: '',
	portFolio: '',
	github: '',
	linkedin: '',
	dribbble: '',
	roleOfInterest: 'Software Engineering Manager',
	experience: [
		{
			id: 'dceni',
			companyName: 'Cloutra',
			description: 'At Cloutra I built Mars and Destroyed Earth',
			endDate: '3333',
			role: 'Software Engineer',
			startDate: '2222',
			skills: '',
		},
	],
	skills: ['Python', 'Rust', 'Prompt Engineering', 'LLM Training', 'Solidity'],
	achievements: [],
	languages: [],
	total: '',
	veteranStatus: '',
	disablity: '',
	willingToRelocate: '',
	race: '',
	currentSalary: '',
	expectedSalary: '',
};

export default CreateResumeProvider;

// At the company, I crafted seamless web experiences, navigated databases, and collaborated on innovative solutions.
// Solidity, Rust, Web3JS, NodeJS
