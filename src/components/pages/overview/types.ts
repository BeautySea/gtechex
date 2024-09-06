export interface ILinkedInQuery {
  f_AL?: boolean;
  f_E?: 1 | 2 | 3 | 4 | 5 | 6;
  f_EA?: boolean;
  f_JT?: 'F' | 'P' | 'C' | 'T' | 'V';
  f_SB2?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  f_TPR?: 'r86400' | 'r604800' | 'r2592000';
  f_WT?: 1 | 2 | 3;
  C?: 2;
  keywords?: string;
  location?: string;
  origin?: 'HISTORY' | 'JOB_SEARCH_PAGE_JOB_FILTER';
  sortBy?: 'DD' | 'R';
  start?: number;
}

export interface IIndeedQuery {
  q?: string;
  l?: string;
  from?: any;
}

export interface IDiceQuery {
  q?: string;
}
