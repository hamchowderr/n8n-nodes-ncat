import type { INodeProperties } from 'n8n-workflow';

const showForSplit = {
	operation: ['split'],
	resource: ['video'],
};

export const splitDescription: INodeProperties[] = [
	{
		displayName: 'Split Mode',
		name: 'splitMode',
		type: 'options',
		displayOptions: {
			show: showForSplit,
		},
		options: [
			{
				name: 'By Number of Parts',
				value: 'parts',
				description: 'Split into N equal parts',
			},
			{
				name: 'By Duration',
				value: 'duration',
				description: 'Split into segments of specified duration',
			},
		],
		default: 'parts',
	},
	{
		displayName: 'Number of Parts',
		name: 'parts',
		type: 'number',
		displayOptions: {
			show: {
				...showForSplit,
				splitMode: ['parts'],
			},
		},
		default: 2,
		required: true,
		description: 'Number of parts to split the video into',
		typeOptions: {
			minValue: 2,
		},
		routing: {
			send: {
				type: 'body',
				property: 'parts',
			},
		},
	},
	{
		displayName: 'Segment Duration',
		name: 'duration',
		type: 'string',
		displayOptions: {
			show: {
				...showForSplit,
				splitMode: ['duration'],
			},
		},
		default: '00:05:00',
		required: true,
		placeholder: '00:05:00',
		description: 'Duration of each segment in HH:MM:SS or seconds format',
		routing: {
			send: {
				type: 'body',
				property: 'duration',
			},
		},
	},
];
