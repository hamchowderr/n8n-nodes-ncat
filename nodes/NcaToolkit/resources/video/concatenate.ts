import type { INodeProperties } from 'n8n-workflow';

const showForConcatenate = {
	operation: ['concatenate'],
	resource: ['video'],
};

export const concatenateDescription: INodeProperties[] = [
	{
		displayName: 'Video URLs',
		name: 'videoUrls',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showForConcatenate,
		},
		default: [],
		required: true,
		placeholder: 'https://example.com/video1.mp4',
		description: 'URLs of videos to concatenate in order',
		routing: {
			send: {
				type: 'body',
				property: 'video_urls',
			},
		},
	},
	{
		displayName: 'Transition',
		name: 'transition',
		type: 'options',
		displayOptions: {
			show: showForConcatenate,
		},
		options: [
			{ name: 'None', value: 'none' },
			{ name: 'Fade', value: 'fade' },
			{ name: 'Dissolve', value: 'dissolve' },
		],
		default: 'none',
		description: 'Transition effect between videos',
		routing: {
			send: {
				type: 'body',
				property: 'transition',
			},
		},
	},
];
