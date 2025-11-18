import type { INodeProperties } from 'n8n-workflow';

const showForCut = {
	operation: ['cut'],
	resource: ['video'],
};

export const cutDescription: INodeProperties[] = [
	{
		displayName: 'Cuts',
		name: 'cuts',
		type: 'fixedCollection',
		displayOptions: {
			show: showForCut,
		},
		required: true,
		default: {},
		placeholder: 'Add Cut',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'cutSegments',
				displayName: 'Cut Segments',
				values: [
					{
						displayName: 'Start',
						name: 'start',
						type: 'string',
						default: '',
						required: true,
						placeholder: '00:00:10.000',
						description: 'Start time of the cut segment (format: hh:mm:ss.ms)',
					},
					{
						displayName: 'End',
						name: 'end',
						type: 'string',
						default: '',
						required: true,
						placeholder: '00:00:20.000',
						description: 'End time of the cut segment (format: hh:mm:ss.ms)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'cuts',
				preSend: [
					async function (this, requestOptions) {
						const cutData = this.getNodeParameter('cuts') as { cutSegments?: Array<{ start: string; end: string }> };
						if (cutData.cutSegments && cutData.cutSegments.length > 0) {
							requestOptions.body.cuts = cutData.cutSegments;
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
			show: showForCut,
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
