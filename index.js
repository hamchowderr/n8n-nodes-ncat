// Entry point for n8n to load this community node package
const { NcaToolkit } = require('./dist/nodes/NcaToolkit/NcaToolkit.node.js');
const { NcaToolkitApi } = require('./dist/credentials/NcaToolkitApi.credentials.js');

module.exports = {
	nodes: {
		NcaToolkit,
	},
	credentials: {
		NcaToolkitApi,
	},
};
