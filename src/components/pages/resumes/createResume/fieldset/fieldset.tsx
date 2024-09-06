import { ReactNode } from 'react';
import styles from './fieldset.module.css';

interface FieldsetProps {
	children: ReactNode;
}

const Fieldset = ({ children }: FieldsetProps) => {
	return (
		<>
			<div className={styles.fieldset}>{children}</div>
		</>
	);
};

export default Fieldset;
