import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './primaryButton.module.css';
import getClassName from '../../../utils/getClassName';
import LoaderIcon from '../icons/loader';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize?: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
	disabled?: boolean;
}

interface PrimaryButtonChildProps {
	children: ReactNode;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
}

const PrimaryButtonChild = ({
	icon,
	iconPosition,
	iconSize,
	loading,
	loadingIcon,
	children,
}: PrimaryButtonChildProps) => {
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

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
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
					<PrimaryButtonChild
						icon={icon}
						iconPosition={iconPosition}
						iconSize={iconSize}
						loading={loading}
						loadingIcon={loadingIcon}>
						{children}
					</PrimaryButtonChild>
				</button>
			</>
		);
	}
);

export default PrimaryButton;
