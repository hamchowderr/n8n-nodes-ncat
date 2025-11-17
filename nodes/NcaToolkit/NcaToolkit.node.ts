import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { mediaDescription } from './resources/media';
import { videoDescription } from './resources/video';
import { audioDescription } from './resources/audio';
import { utilitiesDescription } from './resources/utilities';
import { processingModeField, webhookUrlField, customJobIdField } from './shared/descriptions';

export class NcaToolkit implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NCA Toolkit',
		name: 'ncaToolkit',
		icon: 'file:nca-toolkit.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Process media files using the No Code Architects Toolkit API',
		defaults: {
			name: 'NCA Toolkit',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'ncaToolkitApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Media Operation',
						value: 'media',
					},
					{
						name: 'Video Processing',
						value: 'video',
					},
					{
						name: 'Audio Processing',
						value: 'audio',
					},
					{
						name: 'Utility',
						value: 'utilities',
					},
				],
				default: 'media',
			},
			...mediaDescription,
			...videoDescription,
			...audioDescription,
			...utilitiesDescription,
			processingModeField,
			webhookUrlField,
			customJobIdField,
		],
	};
}
