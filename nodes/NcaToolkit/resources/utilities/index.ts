import type { INodeProperties } from 'n8n-workflow';
import { jobStatusDescription } from './jobStatus';
import { testDescription } from './test';

const showOnlyForUtilities = {
	resource: ['utilities'],
};

export const utilitiesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUtilities,
		},
		options: [
			{
				name: 'Get Job Status',
				value: 'jobStatus',
				action: 'Get job status',
				description: 'Check the status of an asynchronous job',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/toolkit/job/status',
					},
				},
			},
			{
				name: 'Test Connection',
				value: 'test',
				action: 'Test API connection',
				description: 'Verify API installation and connectivity',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/toolkit/test',
					},
				},
			},
		],
		default: 'jobStatus',
	},
	...jobStatusDescription,
	...testDescription,
];
