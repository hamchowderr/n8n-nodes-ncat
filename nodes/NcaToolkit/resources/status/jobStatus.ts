import type { INodeProperties } from 'n8n-workflow';

const showForJobStatus = {
	operation: ['jobStatus'],
	resource: ['status'],
};

export const jobStatusDescription: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		displayOptions: {
			show: showForJobStatus,
		},
		default: '',
		required: true,
		placeholder: 'abc123-def456-ghi789',
		description: 'The job ID returned from an async operation',
		routing: {
			send: {
				type: 'body',
				property: 'job_id',
			},
		},
	},
];
