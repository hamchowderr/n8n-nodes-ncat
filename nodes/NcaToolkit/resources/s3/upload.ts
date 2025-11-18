import type { INodeProperties } from 'n8n-workflow';

const showForUpload = {
	operation: ['upload'],
	resource: ['s3'],
};

export const uploadDescription: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'fileUrl',
		type: 'string',
		displayOptions: {
			show: showForUpload,
		},
		default: '',
		required: true,
		placeholder: 'https://example.com/path/to/file.mp4',
		description: 'The URL of the file to upload to S3',
		routing: {
			send: {
				type: 'body',
				property: 'file_url',
			},
		},
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		displayOptions: {
			show: showForUpload,
		},
		default: '',
		placeholder: 'custom-name.mp4',
		description: 'Custom filename to use for the uploaded file. If not provided, the original filename will be used.',
		routing: {
			send: {
				type: 'body',
				property: 'filename',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Public',
		name: 'public',
		type: 'boolean',
		displayOptions: {
			show: showForUpload,
		},
		default: false,
		description: 'Whether to make the file publicly accessible. Defaults to false.',
		routing: {
			send: {
				type: 'body',
				property: 'public',
			},
		},
	},
];
