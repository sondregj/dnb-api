const {HeaderBuilder} = require('aika')

const crypto = require('crypto')
const querystring = require('querystring')

module.exports = (options) => {
	return new HeaderBuilder({
		constants: {
			apiKey: options.apiKey,
			clientId: options.clientId,
			clientSecret: options.clientSecret,

			hostName: options.hostName,

			// Reference to client JWT
			token: options.token,

			// Amz
			algorithm: 'AWS4-HMAC-SHA256',
			signedHeaders: 'host;x-amz-date',
			awsRegion: options.awsRegion,
			awsService: options.awsService
		},

		helpers: {
			asv4sign: (context, options, clientId, clientSecret) => {
				if (options.method === 'POST') {
					options.body = '{}'
				} else {
					options.body = ''
				}
			
				const algorithm = 'AWS4-HMAC-SHA256'
				const amzDate = context.helpers.createAmzDate()
				const dateStamp = amzDate.substr(0, 8)
				const queryStringMatch = options.path.match(/(.*)\?/)

				let canonicalUri = options.path
				if (queryStringMatch !== null) {
					const firstMatchIndex = 1
					canonicalUri = queryStringMatch[firstMatchIndex]
				}

				const canonicalQuerystring = querystring.stringify(options.query)
				const canonicalHeaders = `host:${options.host}\nx-amz-date:${amzDate}\n`
				const signedHeaders = 'host;x-amz-date'
			
				const signingKey = context.helpers.getSignatureKey(
					context, 
					clientSecret, 
					dateStamp, 
					context.constants.awsService, 
					context.constants.awsRegion
				)
			
				const payloadHash = context.helpers.hashHex(options.body ? JSON.stringify(options.body) : '')
				
				const canonicalRequest = `${options.method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
		
				const credentialScope = `${dateStamp}/${context.constants.awsRegion}/${context.constants.awsService}/aws4_request`
				const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${context.helpers.hashHex(canonicalRequest)}`

				const signature = context.helpers.signData(signingKey, stringToSign, 'hex')
				const credentialHeader = `Credential=${clientId}/${credentialScope}`

				return `${algorithm} ${credentialHeader}, SignedHeaders=${signedHeaders}, Signature=${signature}`
			},
			createAmzDate: () => new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),

			hashHex: string => crypto.createHash('sha256').update(string, 'utf8').digest('hex'),

			signData: (key, data, encoding) => crypto.createHmac('sha256', key).update(data, 'utf8').digest(encoding),
			
			getSignatureKey: (context, key, dateStamp, serviceName, regionName) => {
				const date = context.helpers.signData((`AWS4${key}`), dateStamp)
				const region = context.helpers.signData(date, regionName)
				const service = context.helpers.signData(region, serviceName)
			
				return context.helpers.signData(service, 'aws4_request')
			}
		},

		headerFunctions: {
			Host: c => c.constants.hostName,
			Accept: () => 'application/json',
			'Content-type': () => 'application/json',
			'x-api-key': c => c.constants.apiKey,
			'x-amz-date': c => c.helpers.createAmzDate(),
			'x-dnbapi-jwt': c => c.constants.token.jwt,
			Authorization: (c, r) => c.helpers.asv4sign(c, r, c.constants.clientId, c.constants.clientSecret),
		}
	})
}
