import type { INodeProperties } from 'n8n-workflow';

const showForConvertMp3 = {
	operation: ['convertMp3'],
	resource: ['media'],
};

export const convertMp3Description: INodeProperties[] = [
	{
		displayName: 'Bitrate',
		name: 'bitrate',
		type: 'string',
		displayOptions: {
			show: showForConvertMp3,
		},
		default: '128k',
		placeholder: '192k',
		description: 'Audio bitrate for the MP3 file (e.g., 128k, 192k, 320k)',
		routing: {
			send: {
				type: 'body',
				property: 'bitrate',
			},
		},
	},
];
