import type { INodeProperties } from 'n8n-workflow';
import { uploadDescription } from './upload';

const showOnlyForS3 = {
	resource: ['s3'],
};

export const s3Description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForS3,
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				action: 'Upload file to S3',
				description: 'Upload a file to S3 storage by streaming directly from a URL',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/s3/upload',
					},
				},
			},
		],
		default: 'upload',
	},
	...uploadDescription,
];
