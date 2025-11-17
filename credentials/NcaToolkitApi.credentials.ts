import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NcaToolkitApi implements ICredentialType {
	name = 'ncaToolkitApi';

	displayName = 'NCA Toolkit API';

	icon: Icon = 'file:../icons/nca-toolkit.png';

	documentationUrl = 'https://github.com/stephengpope/no-code-architects-toolkit';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The API key for your NCA Toolkit instance',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.example.com',
			required: true,
			placeholder: 'https://your-nca-toolkit.com',
			description: 'The base URL of your NCA Toolkit API instance',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/toolkit/authenticate',
			method: 'GET',
		},
	};
}
