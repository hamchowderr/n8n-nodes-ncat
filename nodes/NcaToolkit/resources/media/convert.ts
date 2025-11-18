import type { INodeProperties } from 'n8n-workflow';

const showForConvert = {
	operation: ['convert'],
	resource: ['media'],
};

export const convertDescription: INodeProperties[] = [
	{
		displayName: 'Output Format',
		name: 'format',
		type: 'string',
		displayOptions: {
			show: showForConvert,
		},
		default: 'mp4',
		required: true,
		placeholder: 'mp4',
		description: 'Desired output format (e.g., mp4, webm, avi)',
		routing: {
			send: {
				type: 'body',
				property: 'format',
			},
		},
	},
	{
		displayName: 'Conversion Options',
		name: 'conversionOptions',
		type: 'collection',
		displayOptions: {
			show: showForConvert,
		},
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Audio Bitrate',
				name: 'audio_bitrate',
				type: 'string',
				default: '128k',
				placeholder: '128k',
				description: 'Audio bitrate. Default is 128k.',
			},
			{
				displayName: 'Audio Codec',
				name: 'audio_codec',
				type: 'string',
				default: 'aac',
				placeholder: 'aac',
				description: 'Audio codec to use. Default is aac.',
			},
			{
				displayName: 'Video Codec',
				name: 'video_codec',
				type: 'string',
				default: 'libx264',
				placeholder: 'libx264',
				description: 'Video codec to use. Default is libx264.',
			},
			{
				displayName: 'Video CRF',
				name: 'video_crf',
				type: 'number',
				default: 23,
				description: 'Constant Rate Factor for video encoding (0-51). Default is 23.',
				typeOptions: {
					minValue: 0,
					maxValue: 51,
				},
			},
			{
				displayName: 'Video Preset',
				name: 'video_preset',
				type: 'string',
				default: 'medium',
				placeholder: 'medium',
				description: 'Video preset to use. Default is medium.',
			},
		],
		routing: {
			send: {
				type: 'body',
				preSend: [
					async function (this, requestOptions) {
						const options = this.getNodeParameter('conversionOptions') as Record<string, string | number>;
						Object.assign(requestOptions.body, options);
						return requestOptions;
					},
				],
			},
		},
	},
];
