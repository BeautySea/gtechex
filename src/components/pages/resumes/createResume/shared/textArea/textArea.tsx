import { ChangeEvent, TextareaHTMLAttributes, useCallback } from 'react';
import styles from './textArea.module.css';
import { IFormValue } from '../../provider';
import useCreateResumeContext from '../../useCreateResumeContext';

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	name?: keyof Omit<
		IFormValue,
		'experience' | 'skills' | 'achievements' | 'languages'
	>;
}

const TextArea = ({
	label,
	name,
	required = true,
	...props
}: TextInputProps) => {
	const { formValue } = useCreateResumeContext();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
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
				<textarea
					name={name}
					onChange={handleChange}
					required={required}
					rows={5}
					{...props}
				/>
			</label>
		</>
	);
};

export default TextArea;
