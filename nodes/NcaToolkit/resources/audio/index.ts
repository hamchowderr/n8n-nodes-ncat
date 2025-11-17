import type { INodeProperties } from 'n8n-workflow';
import { concatenateDescription } from './concatenate';

const showOnlyForAudio = {
	resource: ['audio'],
};

export const audioDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAudio,
		},
		options: [
			{
				name: 'Concatenate',
				value: 'concatenate',
				action: 'Concatenate audio files',
				description: 'Combine multiple audio files into one',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/audio/concatenate',
					},
				},
			},
		],
		default: 'concatenate',
	},
	...concatenateDescription,
];
