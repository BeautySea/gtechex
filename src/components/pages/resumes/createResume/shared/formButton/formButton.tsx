import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './formButton.module.css';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const FormButton = ({ children, type, ...props }: FormButtonProps) => {
	return (
		<>
			<button className={styles.button} type={type || 'button'} {...props}>
				{children}
			</button>
		</>
	);
};

export default FormButton;
