import type { INodeProperties } from 'n8n-workflow';

const showForJobsStatus = {
	operation: ['jobsStatus'],
	resource: ['status'],
};

export const jobsStatusDescription: INodeProperties[] = [
	{
		displayName: 'Since Seconds',
		name: 'sinceSeconds',
		type: 'number',
		displayOptions: {
			show: showForJobsStatus,
		},
		default: 600,
		placeholder: '600',
		description: 'Number of seconds to look back for jobs. Default is 600 seconds (10 minutes).',
		typeOptions: {
			minValue: 1,
		},
		routing: {
			send: {
				type: 'body',
				property: 'since_seconds',
				value: '={{$value || undefined}}',
			},
		},
	},
];
