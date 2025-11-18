import type { INodeProperties } from 'n8n-workflow';

const showForConcatenate = {
	operation: ['concatenate'],
	resource: ['video'],
};

export const concatenateDescription: INodeProperties[] = [
	{
		displayName: 'Video URLs',
		name: 'videoUrls',
		type: 'fixedCollection',
		displayOptions: {
			show: showForConcatenate,
		},
		required: true,
		default: {},
		placeholder: 'Add Video URL',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'videos',
				displayName: 'Videos',
				values: [
					{
						displayName: 'Video URL',
						name: 'video_url',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'https://example.com/video1.mp4',
						description: 'URL of the video file',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'video_urls',
				preSend: [
					async function (this, requestOptions) {
						const videoData = this.getNodeParameter('videoUrls') as { videos?: Array<{ video_url: string }> };
						if (videoData.videos && videoData.videos.length > 0) {
							requestOptions.body.video_urls = videoData.videos;
						}
						return requestOptions;
					},
				],
			},
		},
	},
];
