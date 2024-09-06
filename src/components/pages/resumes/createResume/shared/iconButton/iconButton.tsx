import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './iconButton.module.css';
import getClassName from '../../../../../../utils/getClassName';
import LoaderIcon from '../../../../../interfaces/icons/loader';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	title: string;
	transparent?: boolean;
}

const IconButton = ({
	children,
	className,
	loading,
	size = 'medium',
	transparent = false,
	type = 'button',
	...props
}: IconButtonProps) => {
	return (
		<>
			<button
				className={
					styles.button +
					getClassName(size === 'small', styles.small) +
					getClassName(size === 'large', styles.large) +
					getClassName(transparent, styles.transparent) +
					getClassName(className)
				}
				type={type}
				{...props}>
				{loading ? <LoaderIcon /> : children}
			</button>
		</>
	);
};

export default IconButton;
