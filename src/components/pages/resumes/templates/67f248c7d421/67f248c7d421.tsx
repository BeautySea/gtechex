/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';
import useElementSize from '../../../../../hooks/views/useElementSize';
import Section from '../shared/section/section';
import styles from './67f248c7d421.module.css';

window.getData = (): Promise<any> => {
	return new Promise<any>((resolve) => {
		resolve({ name: 'Gulliver Jones' });
	});
};

const Template67f248c7d421 = () => {
	const [__data, setData] = useState<any | null>(null);
	const paperRef = useRef<HTMLDivElement | null>(null);

	const [width] = useElementSize(paperRef);

	const fetchData = useCallback(async () => {
		let _data: any;
		if (window.getDataPuppeteer) {
			_data = await window.getDataPuppeteer();
		} else {
			_data = await window.getData();
		}
		setData(_data);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	console.log(width);

	return (
		<>
			<div className={styles.paper} ref={paperRef}>
				{/* style={{ height: width * 1.4142857142857144 }}> */}
				<div className={styles.left}>
					<div className={styles.intro}>
						<h1 className={styles.name}>{__data?.name}</h1>
						<div className={styles.description}>{__data?.bio}</div>
					</div>
					<div className={styles.main}>
						<Section
							title='Experience'
							data={[
								{
									content: __data?.experience[0].description || '',
									extraTitle: 'Extra Title',
									title: __data?.experience[0].companyName,
								},
							]}
						/>
						<Section title='Education' data={data.education} />
						<Section title='Projects' data={data.projects} />
					</div>
				</div>
				<div className={styles.right}></div>
			</div>
		</>
	);
};

export default Template67f248c7d421;

const data = {
	experience: [
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 1',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 2',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 3',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 4',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 5',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 6',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 7',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'PRESENT',
			extraTitle: 'Job Title',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'Company 8',
		},
	],
	education: [
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'MONTH 20XX',
			extraTitle: 'Degree',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'School Name 1',
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
			endDate: 'MONTH 20XX',
			extraTitle: 'Degree',
			location: 'Location',
			startDate: 'MARCH 20XX',
			title: 'School Name 2',
		},
	],
	projects: [
		{
			content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			extraTitle: 'Job Title',
			title: 'Project Name 1',
		},
	],
};
