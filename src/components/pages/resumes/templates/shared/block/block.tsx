import styles from './block.module.css';

interface BlockProps {
	content: string;
	endDate?: string;
	extraTitle: string;
	location?: string;
	startDate?: string;
	title: string;
}

const Block = ({
	content,
	endDate,
	extraTitle,
	location,
	startDate,
	title,
}: BlockProps) => {
	return (
		<>
			<div className={styles.block}>
				<h2 className={styles.title}>
					{title},{' '}
					<span className={styles.locationAndMore}>
						{location} — <em>{extraTitle}</em>
					</span>
				</h2>
				{startDate && endDate && (
					<p className={styles.date}>
						{startDate} - {endDate}
					</p>
				)}
				<div className={styles.content}>{content}</div>
			</div>
		</>
	);
};

export default Block;
