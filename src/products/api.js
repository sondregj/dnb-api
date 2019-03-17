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

	async getToken(idType, customerId) {
		const query = {	customerId: JSON.stringify({ type: idType, value: customerId }) }

		try {
			const data = await this.client.do
				.get(`${this.basePath}token`, query)
				.then(obj => obj.json())

			let jwt = ''

			try {
				jwt = data.tokenInfo[0].jwtToken
			} catch (err) {
				throw new Error('Could not get token')
			}

			this.client.token.jwt = jwt

			return jwt
		} catch (err) {
			throw err
		}
	}
}

module.exports = API
