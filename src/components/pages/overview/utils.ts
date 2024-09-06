import { IDiceQuery, IIndeedQuery, ILinkedInQuery } from './types';

export function buildUrlQuery(query: { [key: string]: any }) {
  return Object.entries(query)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
}

const BASE_LINKEDIN_QUERY: ILinkedInQuery = {
  origin: 'JOB_SEARCH_PAGE_JOB_FILTER',
  sortBy: 'R',
  f_TPR: 'r604800',
};

export function getLinkedInUrl(query: ILinkedInQuery) {
  // console.log(`https://www.linkedin.com/jobs/search/?${buildUrlQuery({
  // 	...BASE_LINKEDIN_QUERY,
  // 	...query,
  // })}`);

  return `https://www.linkedin.com/jobs/search/?${buildUrlQuery({
    ...BASE_LINKEDIN_QUERY,
    ...query,
  })}`;
}

const BASE_INDEED_QUERY: IIndeedQuery = {};
export function getIndeedUrl(query: IIndeedQuery) {
  console.log('the indeed query', query);

  console.log(
    'the indeed url',
    `https://www.indeed.com/jobs?${buildUrlQuery({
      ...BASE_INDEED_QUERY,
      ...query,
    })}`
  );

  return `https://www.indeed.com/jobs?${buildUrlQuery({
    ...BASE_INDEED_QUERY,
    ...query,
  })}`;
}

const BASE_DICE_QUERY: IDiceQuery = {};
export function getDiceUrl(query: IIndeedQuery) {
  return `https://www.dice.com/jobs?q=react%20developer&countryCode=US&radius=30&radiusUnit=mi&page=1&pageSize=20&language=en`;
}
