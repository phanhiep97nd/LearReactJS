import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
/tif (onPerfEntry && onPerfEntry instanceof Function) {
	import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
	/tgetCLS(onPerfEntry);
	/tgetFID(onPerfEntry);
	/tgetFCP(onPerfEntry);
	/tgetLCP(onPerfEntry);
	/tgetTTFB(onPerfEntry);
	});
/t}
};

export default reportWebVitals;
