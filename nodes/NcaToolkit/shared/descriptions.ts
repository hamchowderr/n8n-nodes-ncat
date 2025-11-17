import type { INodeProperties } from 'n8n-workflow';

export const processingModeField: INodeProperties = {
	displayName: 'Processing Mode',
	name: 'processingMode',
	type: 'options',
	options: [
		{
			name: 'Synchronous',
			value: 'sync',
			description: 'Wait for the operation to complete before returning',
		},
		{
			name: 'Asynchronous',
			value: 'async',
			description: 'Queue the operation and return immediately (use webhook for notification)',
		},
	],
	default: 'sync',
	description: 'Whether to wait for the operation to complete or queue it asynchronously',
};

export const webhookUrlField: INodeProperties = {
	displayName: 'Webhook URL',
	name: 'webhookUrl',
	type: 'string',
	displayOptions: {
		show: {
			processingMode: ['async'],
		},
	},
	default: '',
	placeholder: 'https://your-n8n.com/webhook/abc123',
	description: 'URL to receive the result when processing is complete',
};

export const customJobIdField: INodeProperties = {
	displayName: 'Custom Job ID',
	name: 'customJobId',
	type: 'string',
	displayOptions: {
		show: {
			processingMode: ['async'],
		},
	},
	default: '',
	description: 'Optional custom identifier for tracking this job',
};

export const mediaUrlField: INodeProperties = {
	displayName: 'Media URL',
	name: 'mediaUrl',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'https://example.com/media.mp4',
	description: 'URL of the media file to process',
};

export const videoUrlField: INodeProperties = {
	displayName: 'Video URL',
	name: 'videoUrl',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'https://example.com/video.mp4',
	description: 'URL of the video file to process',
};

export const audioUrlField: INodeProperties = {
	displayName: 'Audio URL',
	name: 'audioUrl',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'https://example.com/audio.mp3',
	description: 'URL of the audio file to process',
};
