import { ChangeEvent, SelectHTMLAttributes, useCallback } from 'react';
import styles from './select.module.css';
import getClassName from '../../../../../../utils/getClassName';
import DownArrowIcon from '../../../../../interfaces/icons/downArrow';
import { IFormValue } from '../../provider';
import useCreateResumeContext from '../../useCreateResumeContext';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	name?: keyof Omit<
		IFormValue,
		'experience' | 'skills' | 'achievements' | 'languages'
	>;
}

const Select = ({
	children,
	className,
	label,
	name,
	required = true,
	...props
}: SelectProps) => {
	const { formValue } = useCreateResumeContext();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
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
				<div className={styles.select + getClassName(className)}>
					<select
						name={name}
						onChange={handleChange}
						required={required}
						{...props}>
						{children}
					</select>
					<span className={styles.downArrow}>
						<DownArrowIcon />
					</span>
				</div>
			</label>
		</>
	);
};

export default Select;
