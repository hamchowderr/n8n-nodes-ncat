import type { INodeProperties } from 'n8n-workflow';

export const webhookUrlField: INodeProperties = {
	displayName: 'Webhook URL',
	name: 'webhookUrl',
	type: 'string',
	default: '',
	placeholder: 'https://your-n8n.com/webhook/abc123',
	description: 'Optional URL to receive a webhook notification when processing is complete',
	routing: {
		send: {
			type: 'body',
			property: 'webhook_url',
			value: '={{$value || undefined}}',
		},
	},
};

export const customJobIdField: INodeProperties = {
	displayName: 'Custom Job ID',
	name: 'customJobId',
	type: 'string',
	default: '',
	placeholder: 'request-123',
	description: 'Optional custom identifier for tracking this request',
	routing: {
		send: {
			type: 'body',
			property: 'id',
			value: '={{$value || undefined}}',
		},
	},
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
