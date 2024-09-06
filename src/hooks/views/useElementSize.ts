import { MutableRefObject, useEffect, useState } from 'react';

const useElementSize = (element: MutableRefObject<HTMLElement | null>) => {
	const [size, setSize] = useState({
		width: element.current?.getBoundingClientRect().width || 0,
		height: element.current?.getBoundingClientRect().height || 0,
	});

	useEffect(() => {
		if (!element.current) return;
		const _element = element.current;

		const observer = new ResizeObserver((entries) => {
			const documentElement = entries[0];
			const _width = documentElement.contentRect.width;
			const _height = documentElement.contentRect.height;
			setSize({ width: _width, height: _height });
		});

		observer.observe(_element);

		return () => {
			observer.disconnect();
			observer.unobserve(_element!);
		};
	}, [element]);

	return [size.width, size.height];
};

export default useElementSize;
