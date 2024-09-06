import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import FormButton from '../shared/formButton/formButton';
import TextArea from '../shared/textArea/textArea';
import TextInput from '../shared/textInput/textInput';
import styles from './achievements.module.css';

const Achievements = () => {
	return (
		<>
			<Section className={styles.personalInfo} title='Achievements'>
				<Fieldset>
					<TextInput label='Title of achievement' />
				</Fieldset>
				<Fieldset>
					<TextArea label='Tell us more about the achievement' />
				</Fieldset>
				<FormButton>Add new achievement</FormButton>
			</Section>
		</>
	);
};

export default Achievements;
