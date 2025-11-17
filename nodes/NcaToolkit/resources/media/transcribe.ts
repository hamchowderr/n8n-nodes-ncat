import type { INodeProperties } from 'n8n-workflow';

const showForTranscribe = {
	operation: ['transcribe'],
	resource: ['media'],
};

export const transcribeDescription: INodeProperties[] = [
	{
		displayName: 'Task',
		name: 'task',
		type: 'options',
		displayOptions: {
			show: showForTranscribe,
		},
		options: [
			{
				name: 'Transcribe',
				value: 'transcribe',
				description: 'Transcribe audio in the original language',
			},
			{
				name: 'Translate',
				value: 'translate',
				description: 'Translate audio to English',
			},
		],
		default: 'transcribe',
		routing: {
			send: {
				type: 'body',
				property: 'task',
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: showForTranscribe,
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code (e.g., en, es, fr). Auto-detected if not specified.',
		routing: {
			send: {
				type: 'body',
				property: 'language',
			},
		},
	},
	{
		displayName: 'Output Options',
		name: 'outputOptions',
		type: 'collection',
		displayOptions: {
			show: showForTranscribe,
		},
		default: {},
		options: [
			{
				displayName: 'Include SRT',
				name: 'include_srt',
				type: 'boolean',
				default: true,
				description: 'Whether to include SRT subtitle format in response',
			},
			{
				displayName: 'Include Text',
				name: 'include_text',
				type: 'boolean',
				default: true,
				description: 'Whether to include plain text transcription',
			},
			{
				displayName: 'Include Segments',
				name: 'include_segments',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed segment data with timestamps',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: '={{Object.keys($value).length ? $value : undefined}}',
				preSend: [
					async function (this, requestOptions) {
						const outputOptions = this.getNodeParameter('outputOptions') as {
							include_srt?: boolean;
							include_text?: boolean;
							include_segments?: boolean;
						};
						if (outputOptions.include_srt !== undefined) {
							requestOptions.body.include_srt = outputOptions.include_srt;
						}
						if (outputOptions.include_text !== undefined) {
							requestOptions.body.include_text = outputOptions.include_text;
						}
						if (outputOptions.include_segments !== undefined) {
							requestOptions.body.include_segments = outputOptions.include_segments;
						}
						return requestOptions;
					},
				],
			},
		},
	},
];
