import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import Select from '../shared/select/select';
import TextInput from '../shared/textInput/textInput';
import styles from './personalInfo.module.css';

const PersonalInfo = () => {
	return (
		<>
			<Section className={styles.personalInfo} title='Personal Information'>
				<Fieldset>
					<TextInput label='First name' name='firstName' />
					<TextInput label='Last name' name='lastName' />
				</Fieldset>
				<Fieldset>
					<TextInput label='Email Address' name='email' />
				</Fieldset>
				<Fieldset>
					<TextInput label='Phone number' name='phone' />
					<Select label='Gender' name='gender'>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='other'>Other</option>
					</Select>
				</Fieldset>
				<Fieldset>
					<Select label='Country' name='country'>
						<option value='male'>Nigeria</option>
						<option value='female'>Egypt</option>
						<option value='other'>Lebanon</option>
					</Select>
					<Select label='State' name='state'>
						<option value='male'>Delaware</option>
						<option value='female'>Lagos</option>
						<option value='other'>Dublin</option>
					</Select>
				</Fieldset>
				<Fieldset>
					<TextInput
						label='Portfolio Website'
						name='portFolio'
						placeholder='https://www.name.com'
					/>
				</Fieldset>
				<Fieldset>
					<TextInput
						label='Github URL'
						name='github'
						placeholder='https://www.github.com/githubname'
					/>
				</Fieldset>
				<Fieldset>
					<TextInput
						label='LinkedIn URL'
						name='linkedin'
						placeholder='https://www.linkedin.com/linkedinname'
					/>
				</Fieldset>
				<Fieldset>
					<TextInput
						label='Dribbble URL'
						name='dribbble'
						placeholder='https://www.linkedin.com/linkedinname'
					/>
				</Fieldset>
				<Fieldset>
					<TextInput
						label='Role of interest'
						name='roleOfInterest'
						placeholder='Software Engineer'
					/>
				</Fieldset>
			</Section>
		</>
	);
};

export default PersonalInfo;
