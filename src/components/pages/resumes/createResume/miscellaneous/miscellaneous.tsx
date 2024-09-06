import Fieldset from '../fieldset/fieldset';
import Section from '../section/section';
import Select from '../shared/select/select';
import TextInput from '../shared/textInput/textInput';
import styles from './miscellaneous.module.css';

const Miscellaneous = () => {
  return (
    <>
      <Section className={styles.personalInfo} title="Miscellaneous">
        <Fieldset>
          <TextInput label="Total working experience" name="total" />
          <Select label="Do you identify as a veteran" name="veteranStatus">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="No">Prefer not to Answer</option>
          </Select>
        </Fieldset>
        <Fieldset>
          <Select label="Disability" name="disablity">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="No">Do not wish to disclouse</option>
          </Select>
          <Select label="Willing to relocate" name="willingToRelocate">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </Fieldset>
        <Fieldset>
          <Select label="Race/Ethnicity" name="race">
            <option value="Yes">Black or African American</option>
            <option value="No">Asian or Pacific Islander</option>
            <option value="No">Hispanic or Latino</option>
            <option value="No">Native American or Alaska Native</option>
            <option value="No">White or Caucasian</option>
            <option value="No">Multiracial or Biracial</option>
            <option value="No">A race/ethnicity not listed here</option>
            <option value="No">Prefer not to Answer</option>
          </Select>
        </Fieldset>
        <Fieldset>
          <TextInput label="Current salary" name="currentSalary" />
          <TextInput label="Expected salary" name="expectedSalary" />
        </Fieldset>
      </Section>
    </>
  );
};

export default Miscellaneous;
