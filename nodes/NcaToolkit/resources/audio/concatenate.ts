import type { INodeProperties } from 'n8n-workflow';

const showForConcatenate = {
	operation: ['concatenate'],
	resource: ['audio'],
};

export const concatenateDescription: INodeProperties[] = [
	{
		displayName: 'Audio URLs',
		name: 'audioUrls',
		type: 'fixedCollection',
		displayOptions: {
			show: showForConcatenate,
		},
		required: true,
		default: {},
		placeholder: 'Add Audio URL',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'audios',
				displayName: 'Audios',
				values: [
					{
						displayName: 'Audio URL',
						name: 'audio_url',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'https://example.com/audio1.mp3',
						description: 'URL of the audio file',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'audio_urls',
				preSend: [
					async function (this, requestOptions) {
						const audioData = this.getNodeParameter('audioUrls') as { audios?: Array<{ audio_url: string }> };
						if (audioData.audios && audioData.audios.length > 0) {
							requestOptions.body.audio_urls = audioData.audios;
						}
						return requestOptions;
					},
				],
			},
		},
	},
];
