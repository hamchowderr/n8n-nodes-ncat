import type { INodeProperties } from 'n8n-workflow';

const showForSplit = {
	operation: ['split'],
	resource: ['video'],
};

export const splitDescription: INodeProperties[] = [
	{
		displayName: 'Splits',
		name: 'splits',
		type: 'fixedCollection',
		displayOptions: {
			show: showForSplit,
		},
		required: true,
		default: {},
		placeholder: 'Add Split',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'splitSegments',
				displayName: 'Split Segments',
				values: [
					{
						displayName: 'Start',
						name: 'start',
						type: 'string',
						default: '',
						required: true,
						placeholder: '00:00:00',
						description: 'Start time for this segment (format: hh:mm:ss or mm:ss)',
					},
					{
						displayName: 'End',
						name: 'end',
						type: 'string',
						default: '',
						required: true,
						placeholder: '00:01:00',
						description: 'End time for this segment (format: hh:mm:ss or mm:ss)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'splits',
				preSend: [
					async function (this, requestOptions) {
						const splitData = this.getNodeParameter('splits') as { splitSegments?: Array<{ start: string; end: string }> };
						if (splitData.splitSegments && splitData.splitSegments.length > 0) {
							requestOptions.body.splits = splitData.splitSegments;
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Encoding Options',
		name: 'encodingOptions',
		type: 'collection',
		displayOptions: {
			show: showForSplit,
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
						const options = this.getNodeParameter('encodingOptions') as Record<string, string | number>;
						Object.assign(requestOptions.body, options);
						return requestOptions;
					},
				],
			},
		},
	},
];
