export const TYPE_LOG = 'log'
export const TYPE_INFO = 'info'

function logger(log, type = TYPE_LOG) {
	console[type](log);
}

export default logger;
