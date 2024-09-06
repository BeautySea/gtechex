import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import FormButton from '../shared/formButton/formButton';
import Select from '../shared/select/select';
import styles from './language.module.css';

const Language = () => {
	return (
		<>
			<Section className={styles.personalInfo} title='Language'>
				<Fieldset>
					<Select label='Language' defaultValue=''>
						<option value='' disabled hidden>
							Select your option
						</option>
						<option value='Arabic'>Arabic</option>
						<option value='Nakamoto'>Nakamoto</option>
					</Select>
					<Select label='Select language proficiency'>
						<option value='Beginner'></option>
					</Select>
				</Fieldset>
				<FormButton>Add new language</FormButton>
			</Section>
		</>
	);
};

export default Language;
