import type { INodeProperties } from 'n8n-workflow';
import { jobStatusDescription } from './jobStatus';

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
		],
		default: 'jobStatus',
	},
	...jobStatusDescription,
];
