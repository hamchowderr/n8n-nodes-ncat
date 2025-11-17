import type { INodeProperties } from 'n8n-workflow';
import { mediaUrlField } from '../../shared/descriptions';
import { transcribeDescription } from './transcribe';
import { convertDescription } from './convert';
import { convertMp3Description } from './convertMp3';
import { metadataDescription } from './metadata';
import { silenceDescription } from './silence';

const showOnlyForMedia = {
	resource: ['media'],
};

export const mediaDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMedia,
		},
		options: [
			{
				name: 'Convert Format',
				value: 'convert',
				action: 'Convert media format',
				description: 'Convert media to different format with custom codec settings',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/media/convert',
					},
				},
			},
			{
				name: 'Convert to MP3',
				value: 'convertMp3',
				action: 'Convert to MP3',
				description: 'Convert any media file to MP3 audio',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/media/convert/mp3',
					},
				},
			},
			{
				name: 'Detect Silence',
				value: 'silence',
				action: 'Detect silence in media',
				description: 'Find silent intervals in audio or video',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/media/silence',
					},
				},
			},
			{
				name: 'Extract Metadata',
				value: 'metadata',
				action: 'Extract media metadata',
				description: 'Get format, codec, resolution, bitrate, and duration information',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/media/metadata',
					},
				},
			},
			{
				name: 'Transcribe/Translate',
				value: 'transcribe',
				action: 'Transcribe or translate media',
				description: 'Convert speech to text or translate to English',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/media/transcribe',
					},
				},
			},
		],
		default: 'transcribe',
	},
	{
		...mediaUrlField,
		displayOptions: {
			show: showOnlyForMedia,
		},
		routing: {
			send: {
				type: 'body',
				property: 'media_url',
			},
		},
	},
	...transcribeDescription,
	...convertDescription,
	...convertMp3Description,
	...metadataDescription,
	...silenceDescription,
];
