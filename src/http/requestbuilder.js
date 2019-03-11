const {asv4sign, createAmzDate} = require('./utils')

// createRequest
const requestBuilder = (options, method, path, queryString = '', jwtToken = '', body) => {
	const opts = {
		method,
		host: options.endpoint,
		headers: {
			Host: options.endpoint,
			Accept: 'application/json',
			'Content-type': 'application/json',
			'x-api-key': options.apiKey,
			'x-amz-date': createAmzDate(),
		},
		path,
		params: queryString,
		service: options.awsService,
		region: options.awsRegion,
	}

	if (queryString !== '') {
		opts.path += `?${queryString}`
	}

	if (jwtToken !== '') {
		opts.headers['x-dnbapi-jwt'] = jwtToken
	}

	if (body) {
		opts.body = body
	}

	opts.headers.Authorization = asv4sign(opts, options.clientId, options.clientSecret)

	return opts
}

module.exports = requestBuilder
