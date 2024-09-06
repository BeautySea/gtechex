import { useParams } from 'react-router';
import Template67f248c7d421 from '../components/pages/resumes/templates/67f248c7d421/67f248c7d421';

const templates = [
	{
		id: '67f248c7d421',
		component: <Template67f248c7d421 />,
	},
];

const ResumeTemplatePage = () => {
	const { templateId } = useParams();

	const template = templates.find((item) => item.id === templateId);
	if (template) return template.component;

	return (
		<>
			<div>Template with that ID not found</div>
		</>
	);
};

export default ResumeTemplatePage;
