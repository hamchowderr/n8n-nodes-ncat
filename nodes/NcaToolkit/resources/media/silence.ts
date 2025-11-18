import type { INodeProperties } from 'n8n-workflow';

const showForSilence = {
	operation: ['silence'],
	resource: ['media'],
};

export const silenceDescription: INodeProperties[] = [
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		displayOptions: {
			show: showForSilence,
		},
		required: true,
		default: 0.5,
		description: 'Minimum duration (in seconds) for a silence interval to be considered valid',
		typeOptions: {
			minValue: 0.1,
		},
		routing: {
			send: {
				type: 'body',
				property: 'duration',
			},
		},
	},
	{
		displayName: 'Detection Options',
		name: 'detectionOptions',
		type: 'collection',
		displayOptions: {
			show: showForSilence,
		},
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Start',
				name: 'start',
				type: 'string',
				default: '',
				placeholder: '00:00:10.0',
				description: 'Start time for silence detection (format: HH:MM:SS.ms)',
			},
			{
				displayName: 'End',
				name: 'end',
				type: 'string',
				default: '',
				placeholder: '00:01:00.0',
				description: 'End time for silence detection (format: HH:MM:SS.ms)',
			},
			{
				displayName: 'Noise',
				name: 'noise',
				type: 'string',
				default: '-30dB',
				placeholder: '-30dB',
				description: 'Noise threshold for silence detection in decibels',
			},
			{
				displayName: 'Mono',
				name: 'mono',
				type: 'boolean',
				default: true,
				description: 'Whether to process audio as mono (single channel)',
			},
		],
		routing: {
			send: {
				type: 'body',
				preSend: [
					async function (this, requestOptions) {
						const options = this.getNodeParameter('detectionOptions') as Record<string, string | boolean>;
						Object.assign(requestOptions.body, options);
						return requestOptions;
					},
				],
			},
		},
	},
];
