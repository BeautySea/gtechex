import { ReactNode } from 'react';
import styles from './section.module.css';
import getClassName from '../../../../../utils/getClassName';

interface SectionProps {
	children: ReactNode;
	className?: string;
	containerClassName?: string;
	title: string;
}

const Section = ({
	children,
	className,
	containerClassName,
	title,
}: SectionProps) => {
	return (
		<>
			<div className={styles.section + getClassName(containerClassName)}>
				<h4>{title}</h4>
				<div className={styles.innerContainer + getClassName(className)}>
					{children}
				</div>
			</div>
		</>
	);
};

export default Section;
