import { loadModules } from 'esri-loader';

const esri = {};
const moduleNameMap = {};

async function init(moduleNameList, options, result) {
	const list = await loadModules(moduleNameList, options);
	moduleNameList.forEach((path, index) => {
		moduleNameMap[path] = list[index];
		path.split('/').slice(1).reduce((prev, next, i, array) => {
			const isLast = i === array.length - 1;
			isLast ? prev[next] = list[index] : prev[next] ? null : prev[next] = {};
			return prev[next];
		}, result)
	});
	
	return result;
}

function getByName(path) {
	return moduleNameMap[path];
}

function load(moduleList, options) {
	return init(moduleList, options, esri);
}

export default {
	esri,
	getByName,
	load
};