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
				default: '',
				placeholder: '192k',
				description: 'Audio bitrate (e.g., 128k, 192k)',
			},
			{
				displayName: 'Audio Codec',
				name: 'audio_codec',
				type: 'string',
				default: 'aac',
				placeholder: 'aac',
				description: 'Audio codec to use (e.g., aac, mp3, opus)',
			},
			{
				displayName: 'Frame Rate',
				name: 'frame_rate',
				type: 'number',
				default: 30,
				description: 'Output frame rate (fps)',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'string',
				default: '',
				placeholder: '1920x1080',
				description: 'Output resolution (e.g., 1920x1080, 1280x720)',
			},
			{
				displayName: 'Video Bitrate',
				name: 'video_bitrate',
				type: 'string',
				default: '',
				placeholder: '2000k',
				description: 'Video bitrate (e.g., 2000k, 5M)',
			},
			{
				displayName: 'Video Codec',
				name: 'video_codec',
				type: 'string',
				default: 'libx264',
				placeholder: 'libx264',
				description: 'Video codec to use (e.g., libx264, libx265, vp9)',
			},
			{
				displayName: 'Video CRF',
				name: 'video_crf',
				type: 'number',
				default: 23,
				description: 'Video quality (0-51, lower is better quality). 23 is default.',
				typeOptions: {
					minValue: 0,
					maxValue: 51,
				},
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
