import type { INodeProperties } from 'n8n-workflow';

const showForCut = {
	operation: ['cut'],
	resource: ['video'],
};

export const cutDescription: INodeProperties[] = [
	{
		displayName: 'Segments to Remove',
		name: 'segments',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showForCut,
		},
		default: {},
		placeholder: 'Add Segment',
		description: 'Time segments to remove from the video',
		options: [
			{
				name: 'segmentValues',
				displayName: 'Segment',
				values: [
					{
						displayName: 'Start Time',
						name: 'start',
						type: 'string',
						default: '00:00:00',
						placeholder: '00:00:10',
						description: 'Start time of segment to remove (HH:MM:SS or seconds)',
					},
					{
						displayName: 'End Time',
						name: 'end',
						type: 'string',
						default: '00:00:00',
						placeholder: '00:00:20',
						description: 'End time of segment to remove (HH:MM:SS or seconds)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'segments',
				value: '={{$value.segmentValues}}',
			},
		},
	},
];
