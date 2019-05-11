/**
 * DNB API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class API {
	constructor(client) {
		this.client = client

		this.basePath = '/'
	}

	async getToken(ssn) {
		const body = { ssn }

		try {
			const data = await this.client.do
				.post(`${this.basePath}tokens`, null, body)
				.then(obj => obj.json())

			let jwt = ''

			try {
				jwt = data.jwtToken
			} catch (err) {
				throw new Error('Could not get token')
			}

			this.client.dnbToken.jwt = jwt

			return data
		} catch (err) {
			throw err
		}
	}
}

module.exports = API
