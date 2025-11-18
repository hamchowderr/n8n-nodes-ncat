import type { INodeProperties } from 'n8n-workflow';

const showForThumbnail = {
	operation: ['thumbnail'],
	resource: ['video'],
};

export const thumbnailDescription: INodeProperties[] = [
	{
		displayName: 'Second',
		name: 'second',
		type: 'number',
		displayOptions: {
			show: showForThumbnail,
		},
		default: 0,
		placeholder: '30',
		description: 'Timestamp in seconds at which to extract the thumbnail. Default is 0.',
		typeOptions: {
			minValue: 0,
		},
		routing: {
			send: {
				type: 'body',
				property: 'second',
				value: '={{$value || undefined}}',
			},
		},
	},
];
