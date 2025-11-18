import type { INodeProperties } from 'n8n-workflow';
import { jobStatusDescription } from './jobStatus';
import { jobsStatusDescription } from './jobsStatus';

const showOnlyForStatus = {
	resource: ['status'],
};

export const statusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStatus,
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
				name: 'Get All Jobs Status',
				value: 'jobsStatus',
				action: 'Get all jobs status',
				description: 'Retrieve the status of all jobs within a specified time range',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/toolkit/jobs/status',
					},
				},
			},
		],
		default: 'jobStatus',
	},
	...jobStatusDescription,
	...jobsStatusDescription,
];
