import type {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function ncaToolkitApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const credentials = await this.getCredentials('ncaToolkitApi');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.baseUrl}${endpoint}`,
		headers: {
			'x-api-key': credentials.apiKey as string,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	return await this.helpers.httpRequest(options);
}
