import Block from '../block/block';
import styles from './section.module.css';

interface SectionProps {
	title: string;
	data: {
		content: string;
		endDate?: string;
		extraTitle: string;
		location?: string;
		startDate?: string;
		title: string;
	}[];
}

const Section = ({ title, data }: SectionProps) => {
	return (
		<>
			<div className={styles.section}>
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.blocks}>
					{data.map((item) => (
						<Block
							key={item.title}
							content={item.content}
							endDate={item.endDate}
							extraTitle={item.extraTitle}
							location={item.location}
							startDate={item.startDate}
							title={item.title}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Section;
