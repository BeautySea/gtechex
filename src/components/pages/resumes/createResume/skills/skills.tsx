import { useEffect, useState } from 'react';
import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import TextInput from '../shared/textInput/textInput';
import styles from './skills.module.css';
import useCreateResumeContext from '../useCreateResumeContext';

const Skills = () => {
	const { formValue } = useCreateResumeContext();

	const [value, setValue] = useState('');

	useEffect(() => {
		formValue.current.skills = value.split(',');
	}, [formValue, value]);

	return (
		<>
			<Section className={styles.personalInfo} title='Add Skills'>
				<Fieldset>
					<TextInput
						label='Add your skills'
						onChange={(e) => setValue(e.target.value)}
						value={value}
					/>
				</Fieldset>
			</Section>
		</>
	);
};

export default Skills;
