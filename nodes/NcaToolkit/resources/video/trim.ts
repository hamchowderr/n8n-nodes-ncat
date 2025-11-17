import type { INodeProperties } from 'n8n-workflow';

const showForTrim = {
	operation: ['trim'],
	resource: ['video'],
};

export const trimDescription: INodeProperties[] = [
	{
		displayName: 'Start Time',
		name: 'startTime',
		type: 'string',
		displayOptions: {
			show: showForTrim,
		},
		default: '00:00:00',
		required: true,
		placeholder: '00:00:10',
		description: 'Start time in HH:MM:SS or seconds format',
		routing: {
			send: {
				type: 'body',
				property: 'start_time',
			},
		},
	},
	{
		displayName: 'End Time',
		name: 'endTime',
		type: 'string',
		displayOptions: {
			show: showForTrim,
		},
		default: '',
		required: true,
		placeholder: '00:01:30',
		description: 'End time in HH:MM:SS or seconds format',
		routing: {
			send: {
				type: 'body',
				property: 'end_time',
			},
		},
	},
];
