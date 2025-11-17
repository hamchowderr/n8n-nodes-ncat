import type { INodeProperties } from 'n8n-workflow';

const showForConcatenate = {
	operation: ['concatenate'],
	resource: ['audio'],
};

export const concatenateDescription: INodeProperties[] = [
	{
		displayName: 'Audio URLs',
		name: 'audioUrls',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showForConcatenate,
		},
		default: [],
		required: true,
		placeholder: 'https://example.com/audio1.mp3',
		description: 'URLs of audio files to concatenate in order',
		routing: {
			send: {
				type: 'body',
				property: 'audio_urls',
			},
		},
	},
	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'options',
		displayOptions: {
			show: showForConcatenate,
		},
		options: [
			{ name: 'MP3', value: 'mp3' },
			{ name: 'WAV', value: 'wav' },
			{ name: 'AAC', value: 'aac' },
			{ name: 'FLAC', value: 'flac' },
		],
		default: 'mp3',
		description: 'Output audio format',
		routing: {
			send: {
				type: 'body',
				property: 'output_format',
			},
		},
	},
];
