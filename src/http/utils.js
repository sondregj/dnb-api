const crypto = require('crypto')

const signData = (key, data, encoding) => crypto.createHmac('sha256', key).update(data, 'utf8').digest(encoding)

const hashHex = (string) => crypto.createHash('sha256').update(string, 'utf8').digest('hex')

const getSignatureKey = (key, dateStamp, serviceName, regionName) => {
	const date = signData((`AWS4${key}`), dateStamp)
	const region = signData(date, regionName)
	const service = signData(region, serviceName)
	return signData(service, 'aws4_request')
}

const asv4sign = (options, clientId, clientSecret) => {
	const algorithm = 'AWS4-HMAC-SHA256'
	const amzDate = options.headers['x-amz-date']
	const dateStamp = amzDate.substr(0, 8)
	const queryStringMatch = options.path.match(/(.*)\?/)
	let canonicalUri = options.path
	if (queryStringMatch !== null) {
		const firstMatchIndex = 1
		canonicalUri = queryStringMatch[firstMatchIndex]
	}
	const canonicalQuerystring = options.params
	const canonicalHeaders = `host:${options.host}\nx-amz-date:${amzDate}\n`
	const signedHeaders = 'host;x-amz-date'
	const payloadHash = hashHex('')
	const canonicalRequest = `GET\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
	const credentialScope = `${dateStamp}/${options.region}/${options.service}/aws4_request`
	const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashHex(canonicalRequest)}`
	const signingKey = getSignatureKey(clientSecret, dateStamp, options.service, options.region)
	const signature = signData(signingKey, stringToSign, 'hex')
	const credentialHeader = `Credential=${clientId}/${credentialScope}`
	return `${algorithm} ${credentialHeader}, SignedHeaders=${signedHeaders}, Signature=${signature}`
}


const createAmzDate = () => new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')

module.exports = {
	createAmzDate,
	asv4sign
}


