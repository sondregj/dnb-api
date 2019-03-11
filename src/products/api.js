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
			const data = await this.client.do.get('${this.basePath}token', '', query)

			const jwt = data.tokenInfo[0].jwtToken
			this.client.jwt = jwt

			return jwt
		} catch (err) {
			throw err
		}
	}
}

module.exports = API
