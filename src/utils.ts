import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number) {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const savedCallback = useRef<() => void>(() => {});

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}