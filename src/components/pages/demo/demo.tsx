import { useCallback, useState } from 'react';
import styles from './demo.module.css';
import getRandomId from '../../../utils/getRandomId';

interface IQuery {
	f_AL?: boolean;
	f_E?: 1 | 2 | 3 | 4 | 5 | 6;
	f_EA?: boolean;
	f_JT?: 'F' | 'P' | 'C' | 'T' | 'V';
	f_SB2?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	f_TPR?: 'r86400' | 'r604800' | 'r2592000';
	f_WT?: 1 | 2 | 3;
	keywords?: string;
	location?: string;
	origin?: 'HISTORY' | 'JOB_SEARCH_PAGE_JOB_FILTER';
	sortBy?: 'DD' | 'R';
	start?: number;
}
const BASE_QUERY: IQuery = {
	origin: 'JOB_SEARCH_PAGE_JOB_FILTER',
	sortBy: 'R',
	f_TPR: 'r604800',
};
const SAMPLE_QUERY: IQuery = {
	f_AL: false,
	f_E: 4,
	f_EA: true,
	f_JT: 'C',
	keywords: 'React Developer',
	location: 'United States',
};

function buildUrlQuery(query: { [key: string]: any }) {
	return Object.entries(query)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		)
		.join('&');
}

const SAMPLE_URL = `https://www.linkedin.com/jobs/search/?${buildUrlQuery({
	...BASE_QUERY,
	...SAMPLE_QUERY,
})}`;

interface ScrapedJob {
	id: string;
	title: string;
	url: string;
}

const Demo = () => {
	const [amount, setAmount] = useState(15);
	const [scrapedJobs, setScrapedJobs] = useState<ScrapedJob[]>([]);

	const handleClick = useCallback(() => {
		chrome.runtime.sendMessage(
			'kfmjnhnacgopcnlifgelefnmcjnlpnjd',
			{ command: 'SCAN_FOR_JOBS', data: { amount, url: SAMPLE_URL } },
			function (response: { data: ScrapedJob[] } | undefined) {
				console.log('Response from background script:', response);
				const jobs: ScrapedJob[] = response?.data || [];
				const jobsWithIDs: ScrapedJob[] = jobs.map((item) => ({
					...item,
					id: getRandomId(),
				}));
				setScrapedJobs(jobsWithIDs);
			}
		);
	}, [amount]);

	return (
		<>
			<div>
				<button onClick={handleClick}>Scan for Jobs</button>
				<input
					onChange={(e) => setAmount(e.target.valueAsNumber)}
					type='number'
					value={amount}
				/>
				<div className={styles.jobList}>
					{scrapedJobs.map((item, index) => (
						<div className={styles.jobItem} key={item.title}>
							<h2>{index + 1}.</h2>
							<a href={item.url}>{item.title}</a>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Demo;
