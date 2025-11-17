import type { INodeProperties } from 'n8n-workflow';
import { videoUrlField } from '../../shared/descriptions';
import { captionDescription } from './caption';
import { trimDescription } from './trim';
import { splitDescription } from './split';
import { cutDescription } from './cut';
import { concatenateDescription } from './concatenate';
import { thumbnailDescription } from './thumbnail';

const showOnlyForVideo = {
	resource: ['video'],
};

const showVideoUrlForOps = {
	resource: ['video'],
	operation: ['caption', 'trim', 'split', 'cut', 'thumbnail'],
};

export const videoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVideo,
		},
		options: [
			{
				name: 'Caption Video',
				value: 'caption',
				action: 'Add captions to video',
				description: 'Add styled captions via auto-transcription or custom SRT',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/caption',
					},
				},
			},
			{
				name: 'Concatenate Videos',
				value: 'concatenate',
				action: 'Concatenate videos',
				description: 'Merge multiple videos into one',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/concatenate',
					},
				},
			},
			{
				name: 'Cut Video',
				value: 'cut',
				action: 'Cut segments from video',
				description: 'Remove specific time segments from video',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/cut',
					},
				},
			},
			{
				name: 'Extract Thumbnail',
				value: 'thumbnail',
				action: 'Extract video thumbnail',
				description: 'Get a thumbnail image at specific timestamp',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/thumbnail',
					},
				},
			},
			{
				name: 'Split Video',
				value: 'split',
				action: 'Split video into parts',
				description: 'Split video into multiple segments',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/split',
					},
				},
			},
			{
				name: 'Trim Video',
				value: 'trim',
				action: 'Trim video',
				description: 'Keep only content between start and end times',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/video/trim',
					},
				},
			},
		],
		default: 'caption',
	},
	{
		...videoUrlField,
		displayOptions: {
			show: showVideoUrlForOps,
		},
		routing: {
			send: {
				type: 'body',
				property: 'video_url',
			},
		},
	},
	...captionDescription,
	...trimDescription,
	...splitDescription,
	...cutDescription,
	...concatenateDescription,
	...thumbnailDescription,
];
