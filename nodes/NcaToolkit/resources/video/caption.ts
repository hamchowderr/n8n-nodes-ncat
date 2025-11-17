import type { INodeProperties } from 'n8n-workflow';

const showForCaption = {
	operation: ['caption'],
	resource: ['video'],
};

export const captionDescription: INodeProperties[] = [
	{
		displayName: 'Caption Mode',
		name: 'captionMode',
		type: 'options',
		displayOptions: {
			show: showForCaption,
		},
		options: [
			{
				name: 'Auto-Transcribe',
				value: 'auto',
				description: 'Automatically transcribe speech and add as captions',
			},
			{
				name: 'Custom Captions',
				value: 'custom',
				description: 'Provide your own caption file (SRT format)',
			},
		],
		default: 'auto',
	},
	{
		displayName: 'Caption File URL',
		name: 'captionFileUrl',
		type: 'string',
		displayOptions: {
			show: {
				...showForCaption,
				captionMode: ['custom'],
			},
		},
		default: '',
		required: true,
		placeholder: 'https://example.com/captions.srt',
		description: 'URL to your SRT caption file',
		routing: {
			send: {
				type: 'body',
				property: 'caption_file_url',
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				...showForCaption,
				captionMode: ['auto'],
			},
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code for auto-transcription (e.g., en, es, fr)',
		routing: {
			send: {
				type: 'body',
				property: 'language',
			},
		},
	},
	{
		displayName: 'Caption Settings',
		name: 'captionSettings',
		type: 'collection',
		displayOptions: {
			show: showForCaption,
		},
		default: {},
		placeholder: 'Add Setting',
		options: [
			{
				displayName: 'Background Color',
				name: 'box_color',
				type: 'color',
				default: '',
				placeholder: '#000000@0.5',
				description: 'Background box color (use @opacity for transparency)',
			},
			{
				displayName: 'Font Color',
				name: 'line_color',
				type: 'color',
				default: '#FFFFFF',
				placeholder: '#FFFFFF',
				description: 'Text color in hex format',
			},
			{
				displayName: 'Font Size',
				name: 'font_size',
				type: 'number',
				default: 24,
				description: 'Font size in points',
			},
			{
				displayName: 'Max Width',
				name: 'max_width',
				type: 'number',
				default: 80,
				description: 'Maximum caption width as percentage of video width',
				typeOptions: {
					minValue: 10,
					maxValue: 100,
				},
			},
			{
				displayName: 'Outline Color',
				name: 'outline_color',
				type: 'color',
				default: '#000000',
				placeholder: '#000000',
				description: 'Outline color in hex format',
			},
			{
				displayName: 'Outline Width',
				name: 'outline_width',
				type: 'number',
				default: 2,
				description: 'Width of text outline in pixels',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				options: [
					{ name: 'Bottom Center', value: 'bottom_center' },
					{ name: 'Bottom Left', value: 'bottom_left' },
					{ name: 'Bottom Right', value: 'bottom_right' },
					{ name: 'Center', value: 'center' },
					{ name: 'Top Center', value: 'top_center' },
					{ name: 'Top Left', value: 'top_left' },
					{ name: 'Top Right', value: 'top_right' },
				],
				default: 'bottom_center',
				description: 'Caption position on screen',
			},
			{
				displayName: 'Style',
				name: 'style',
				type: 'options',
				options: [
					{ name: 'Classic', value: 'classic' },
					{ name: 'Modern', value: 'modern' },
					{ name: 'Minimal', value: 'minimal' },
				],
				default: 'classic',
				description: 'Caption style preset',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'settings',
			},
		},
	},
];
