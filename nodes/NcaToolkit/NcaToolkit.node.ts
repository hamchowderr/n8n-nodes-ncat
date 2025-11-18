import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { mediaDescription } from './resources/media';
import { videoDescription } from './resources/video';
import { audioDescription } from './resources/audio';
import { s3Description } from './resources/s3';
import { statusDescription } from './resources/status';
import { webhookUrlField, customJobIdField } from './shared/descriptions';

export class NcaToolkit implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NCA Toolkit',
		name: 'ncaToolkit',
		icon: { light: 'file:../../icons/nca-toolkit.svg', dark: 'file:../../icons/nca-toolkit.dark.svg' },
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
						name: 'Audio Processing',
						value: 'audio',
					},
					{
						name: 'Media Operation',
						value: 'media',
					},
					{
						name: 'S3',
						value: 's3',
					},
					{
						name: 'Status',
						value: 'status',
					},
					{
						name: 'Video Processing',
						value: 'video',
					},
				],
				default: 'media',
			},
			...mediaDescription,
			...videoDescription,
			...audioDescription,
			...s3Description,
			...statusDescription,
			webhookUrlField,
			customJobIdField,
		],
	};
}
