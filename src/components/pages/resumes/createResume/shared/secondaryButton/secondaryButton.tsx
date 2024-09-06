import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './secondaryButton.module.css';
import LoaderIcon from '../../../../../interfaces/icons/loader';
import getClassName from '../../../../../../utils/getClassName';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize?: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
	disabled?: boolean;
}

interface SecondaryButtonChildProps {
	children: ReactNode;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
}

const SecondaryButtonChild = ({
	icon,
	iconPosition,
	iconSize,
	loading,
	loadingIcon,
	children,
}: SecondaryButtonChildProps) => {
	const _loadingIcon = loadingIcon || <LoaderIcon />;

	return icon ? (
		<>
			{iconPosition === 'right' && <span>{children}</span>}
			<span
				className={
					styles.icon +
					` ${styles[iconSize]}` +
					getClassName(loading, styles.loading)
				}>
				{loading ? _loadingIcon : icon}
			</span>
			{iconPosition === 'left' && <span>{children}</span>}
		</>
	) : (
		<>
			{loading ? <span className={styles.icon}>{_loadingIcon}</span> : children}
		</>
	);
};

const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
	(
		{
			children,
			className,
			disabled,
			icon,
			iconPosition = 'left',
			iconSize = 'medium',
			loading = false,
			loadingIcon,
			type = 'button',
			...props
		},
		ref
	) => {
		return (
			<>
				<button
					ref={ref}
					className={styles.button + getClassName(className)}
					disabled={disabled ?? loading}
					type={type}
					{...props}>
					<SecondaryButtonChild
						icon={icon}
						iconPosition={iconPosition}
						iconSize={iconSize}
						loading={loading}
						loadingIcon={loadingIcon}>
						{children}
					</SecondaryButtonChild>
				</button>
			</>
		);
	}
);

export default SecondaryButton;
