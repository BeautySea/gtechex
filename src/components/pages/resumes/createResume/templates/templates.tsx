import Section from '../section/section';
import styles from './templates.module.css';
import Template1 from '../shared/assets/template1.png';

const Templates = () => {
	return (
		<>
			<Section
				className={styles.templates}
				containerClassName={styles.templatesContainer}
				title='Select Templates'>
				<TemplateCard image={Template1} title='Template 1' />
				<TemplateCard image={Template1} title='Template 2' />
				<TemplateCard image={Template1} title='Template 3' />
				<TemplateCard image={Template1} title='Template 4' />
			</Section>
		</>
	);
};

interface TemplateCardProps {
	image: string;
	title: string;
}

const TemplateCard = ({ image, title }: TemplateCardProps) => {
	return (
		<>
			<div className={styles.cardContainer}>
				<h6 className={styles.title}>{title}</h6>
				<div className={styles.image}>
					<img src={image} alt={`${title} Image`} />
				</div>
			</div>
		</>
	);
};

export default Templates;
