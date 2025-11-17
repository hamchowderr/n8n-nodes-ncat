import type { INodeProperties } from 'n8n-workflow';

const showForSilence = {
	operation: ['silence'],
	resource: ['media'],
};

export const silenceDescription: INodeProperties[] = [
	{
		displayName: 'Silence Threshold',
		name: 'silenceThreshold',
		type: 'string',
		displayOptions: {
			show: showForSilence,
		},
		default: '-50dB',
		placeholder: '-50dB',
		description: 'Noise level below which silence is detected (e.g., -30dB, -50dB)',
		routing: {
			send: {
				type: 'body',
				property: 'silence_threshold',
			},
		},
	},
	{
		displayName: 'Minimum Duration',
		name: 'minimumDuration',
		type: 'number',
		displayOptions: {
			show: showForSilence,
		},
		default: 0.5,
		description: 'Minimum duration (in seconds) to consider as silence',
		typeOptions: {
			minValue: 0,
		},
		routing: {
			send: {
				type: 'body',
				property: 'minimum_duration',
			},
		},
	},
];
