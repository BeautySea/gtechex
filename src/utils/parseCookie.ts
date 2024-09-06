interface ObjectMap {
	[key: string]: string;
}

export default function parseCookie(str: string): ObjectMap {
	return str
		.split(';')
		.map((v) => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {} as ObjectMap);
}
