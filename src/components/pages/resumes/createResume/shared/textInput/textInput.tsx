import { ChangeEvent, InputHTMLAttributes, useCallback } from 'react';
import styles from './textInput.module.css';
import useCreateResumeContext from '../../useCreateResumeContext';
import { IFormValue } from '../../provider';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name?: keyof Omit<
		IFormValue,
		'experience' | 'skills' | 'achievements' | 'languages'
	>;
}

const TextInput = ({
	label,
	name,
	required = true,
	...props
}: TextInputProps) => {
	const { formValue } = useCreateResumeContext();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (name) {
				formValue.current[name] = event.target.value;
			}
		},
		[formValue, name]
	);

	return (
		<>
			<label className={styles.label}>
				<span>{label}</span>
				<input
					name={name}
					onChange={handleChange}
					required={required}
					type='text'
					{...props}
				/>
			</label>
		</>
	);
};

export default TextInput;
