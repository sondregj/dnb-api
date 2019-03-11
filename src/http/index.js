const request = require('./request')
const querystring = require('querystring')

const requestBuilder = require('./requestbuilder')

class RequestHandler {
	constructor(options) {
		this.options = options
	}

	async get(path, jwtToken = '', query = {}) {
		return this.https('GET', path, jwtToken, query)
	}

	async post(path, jwtToken = '', query = {}, body) {
		return this.https('POST', path, jwtToken, query, body)
	}

	async put(path, jwtToken = '', query = {}, body) {
		return this.https('PUT', path, jwtToken, query, body)
	}

	async patch(path, jwtToken = '', query = {}, body) {
		return this.https('PATCH', path, jwtToken, query, body)
	}

	async delete(path, jwtToken = '', query = {}) {
		return this.https('DELETE', path, jwtToken, query)
	}

	async https(method, path, jwtToken, query, body = null) {
		let queryString = ''

		if (Object.keys(query).length > 0) {
			queryString = querystring.stringify(query)
		}
		
		const opts = requestBuilder(this.options, method, path, queryString, jwtToken, body)

		return request(opts)
	}
}

module.exports = RequestHandler
