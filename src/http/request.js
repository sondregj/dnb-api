const https = require('https')

module.exports = async (params) => new Promise((resolve, reject) => {
	const req = https.request(params, (res) => {

		let body = []
		res.on('data', (chunk) => {body.push(chunk)})

		res.on('end', () => {
			try {
				body = JSON.parse(Buffer.concat(body).toString())

				if (res.statusCode < 200 || res.statusCode >= 300) {
					req.end()
					return reject({
						body,
						errorDocumentation: body.errorDocumentation,
						errorDetails: body.errorDetails
					})
				}
			} catch (e) {
				reject(e)
			}
			resolve(body)
		})

		return res
	})
	req.on('error', (err) => {reject(err)})
	req.end()
})

