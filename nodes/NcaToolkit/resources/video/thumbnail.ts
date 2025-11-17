import type { INodeProperties } from 'n8n-workflow';

const showForThumbnail = {
	operation: ['thumbnail'],
	resource: ['video'],
};

export const thumbnailDescription: INodeProperties[] = [
	{
		displayName: 'Timestamp',
		name: 'timestamp',
		type: 'string',
		displayOptions: {
			show: showForThumbnail,
		},
		default: '00:00:00',
		required: true,
		placeholder: '00:00:05',
		description: 'Time to extract thumbnail from (HH:MM:SS or seconds)',
		routing: {
			send: {
				type: 'body',
				property: 'timestamp',
			},
		},
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		displayOptions: {
			show: showForThumbnail,
		},
		options: [
			{ name: 'JPEG', value: 'jpg' },
			{ name: 'PNG', value: 'png' },
			{ name: 'WebP', value: 'webp' },
		],
		default: 'jpg',
		description: 'Output image format',
		routing: {
			send: {
				type: 'body',
				property: 'format',
			},
		},
	},
	{
		displayName: 'Quality',
		name: 'quality',
		type: 'number',
		displayOptions: {
			show: showForThumbnail,
		},
		default: 85,
		description: 'Image quality (1-100)',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		routing: {
			send: {
				type: 'body',
				property: 'quality',
			},
		},
	},
];
