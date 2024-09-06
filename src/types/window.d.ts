declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getData: () => Promise<any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getDataPuppeteer?: () => Promise<any>;
	}
}

export {};
