import type { INodeProperties } from 'n8n-workflow';

const showForCaption = {
	operation: ['caption'],
	resource: ['video'],
};

export const captionDescription: INodeProperties[] = [
	{
		displayName: 'Captions',
		name: 'captions',
		type: 'string',
		displayOptions: {
			show: showForCaption,
		},
		default: '',
		placeholder: 'Raw text, SRT URL, or ASS URL',
		description: 'Raw caption text, URL to SRT file, URL to ASS file, or leave empty for auto-transcription',
		routing: {
			send: {
				type: 'body',
				property: 'captions',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: showForCaption,
		},
		default: 'auto',
		placeholder: 'auto',
		description: 'Language code for captions (e.g., en, fr). Defaults to auto.',
		routing: {
			send: {
				type: 'body',
				property: 'language',
			},
		},
	},
	{
		displayName: 'Settings',
		name: 'settings',
		type: 'collection',
		displayOptions: {
			show: showForCaption,
		},
		default: {},
		placeholder: 'Add Setting',
		options: [
			{
				displayName: 'Alignment',
				name: 'alignment',
				type: 'options',
				options: [
					{ name: 'Left', value: 'left' },
					{ name: 'Center', value: 'center' },
					{ name: 'Right', value: 'right' },
				],
				default: 'center',
				description: 'Text alignment',
			},
			{
				displayName: 'All Caps',
				name: 'all_caps',
				type: 'boolean',
				default: false,
				description: 'Whether to display captions in all caps',
			},
			{
				displayName: 'Angle',
				name: 'angle',
				type: 'number',
				default: 0,
				description: 'Text rotation angle',
			},
			{
				displayName: 'Bold',
				name: 'bold',
				type: 'boolean',
				default: false,
				description: 'Whether to use bold text',
			},
			{
				displayName: 'Font Family',
				name: 'font_family',
				type: 'string',
				default: '',
				placeholder: 'Arial',
				description: 'Font family name',
			},
			{
				displayName: 'Font Size',
				name: 'font_size',
				type: 'number',
				default: 24,

			},
			{
				displayName: 'Italic',
				name: 'italic',
				type: 'boolean',
				default: false,
				description: 'Whether to use italic text',
			},
			{
				displayName: 'Line Color',
				name: 'line_color',
				type: 'color',
				default: '',
				placeholder: '#FFFFFF',
				description: 'Color for caption text',
			},
			{
				displayName: 'Max Words Per Line',
				name: 'max_words_per_line',
				type: 'number',
				default: 10,
				description: 'Maximum words per line',
			},
			{
				displayName: 'Outline Color',
				name: 'outline_color',
				type: 'color',
				default: '',
				placeholder: '#000000',
				description: 'Color for text outline',
			},
			{
				displayName: 'Outline Width',
				name: 'outline_width',
				type: 'number',
				default: 0,
				description: 'Text outline width',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				options: [
					{ name: 'Bottom Center', value: 'bottom_center' },
					{ name: 'Bottom Left', value: 'bottom_left' },
					{ name: 'Bottom Right', value: 'bottom_right' },
					{ name: 'Middle Center', value: 'middle_center' },
					{ name: 'Middle Left', value: 'middle_left' },
					{ name: 'Middle Right', value: 'middle_right' },
					{ name: 'Top Center', value: 'top_center' },
					{ name: 'Top Left', value: 'top_left' },
					{ name: 'Top Right', value: 'top_right' },
				],
				default: 'bottom_center',
				description: 'Caption position on screen',
			},
			{
				displayName: 'Shadow Offset',
				name: 'shadow_offset',
				type: 'number',
				default: 0,

			},
			{
				displayName: 'Spacing',
				name: 'spacing',
				type: 'number',
				default: 0,
				description: 'Letter spacing',
			},
			{
				displayName: 'Strikeout',
				name: 'strikeout',
				type: 'boolean',
				default: false,
				description: 'Whether to strikeout text',
			},
			{
				displayName: 'Style',
				name: 'style',
				type: 'options',
				options: [
					{ name: 'Classic', value: 'classic', description: 'Regular captioning with all text displayed at once' },
					{ name: 'Highlight', value: 'highlight', description: 'Shows full text but highlights current word' },
					{ name: 'Karaoke', value: 'karaoke', description: 'Highlights words sequentially in karaoke style' },
					{ name: 'Underline', value: 'underline', description: 'Shows full text but underlines current word' },
					{ name: 'Word by Word', value: 'word_by_word', description: 'Shows one word at a time' },
				],
				default: 'classic',
				description: 'Caption style',
			},
			{
				displayName: 'Underline',
				name: 'underline',
				type: 'boolean',
				default: false,
				description: 'Whether to underline text',
			},
			{
				displayName: 'Word Color',
				name: 'word_color',
				type: 'color',
				default: '',
				placeholder: '#FFFF00',
				description: 'Color for highlighted word (karaoke/highlight styles)',
			},
			{
				displayName: 'X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X position offset',
			},
			{
				displayName: 'Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y position offset',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'settings',
			},
		},
	},
	{
		displayName: 'Replace',
		name: 'replace',
		type: 'fixedCollection',
		displayOptions: {
			show: showForCaption,
		},
		default: {},
		placeholder: 'Add Replacement',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'replacements',
				displayName: 'Replacements',
				values: [
					{
						displayName: 'Find',
						name: 'find',
						type: 'string',
						default: '',
						placeholder: 'um',
						description: 'Text to find',
					},
					{
						displayName: 'Replace',
						name: 'replace',
						type: 'string',
						default: '',
						placeholder: '',
						description: 'Text to replace with',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'replace',
				preSend: [
					async function (this, requestOptions) {
						const replaceData = this.getNodeParameter('replace') as { replacements?: Array<{ find: string; replace: string }> };
						if (replaceData.replacements && replaceData.replacements.length > 0) {
							requestOptions.body.replace = replaceData.replacements;
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Exclude Time Ranges',
		name: 'excludeTimeRanges',
		type: 'fixedCollection',
		displayOptions: {
			show: showForCaption,
		},
		default: {},
		placeholder: 'Add Time Range',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'ranges',
				displayName: 'Ranges',
				values: [
					{
						displayName: 'Start',
						name: 'start',
						type: 'string',
						default: '',
						placeholder: '00:00:10.000',
						description: 'Start time (format: HH:MM:SS.ms)',
					},
					{
						displayName: 'End',
						name: 'end',
						type: 'string',
						default: '',
						placeholder: '00:00:20.000',
						description: 'End time (format: HH:MM:SS.ms)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'exclude_time_ranges',
				preSend: [
					async function (this, requestOptions) {
						const rangeData = this.getNodeParameter('excludeTimeRanges') as { ranges?: Array<{ start: string; end: string }> };
						if (rangeData.ranges && rangeData.ranges.length > 0) {
							requestOptions.body.exclude_time_ranges = rangeData.ranges;
						}
						return requestOptions;
					},
				],
			},
		},
	},
];
