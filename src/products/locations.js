/**
 * DNB Locations API
 * 
 * Does not require JWT authentication
 * 
 * @param client to use
 */
class Locations {
	constructor(client) {
		this.client = client

		this.basePath = '/locations'
	}

	async getDNBBranches() {
		try {
			return await this.client.do
				.get(`${this.basePath}/branches`)
		} catch (err) {
			throw err
		}
	}

	async getBranchDetails(id) {
		try {
			return await this.client.do
				.get(`${this.basePath}/branches/${id}`)
		} catch (err) {
			throw err
		}
	}

	async getDNBATMs() {
		try {
			return await this.client.do
				.get(`${this.basePath}/atms`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async findNearestBranch(latitude, longitude) {
		try {
			return await this.client.do
				.get(`${this.basePath}/branches/coordinates`, {latitude, longitude})
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async findNearestBranch(address) {
		try {
			return await this.client.do
				.get(`${this.basePath}/branches/findbyaddress`, {address})
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async findNearestATM(latitude, longitude) {
		try {
			return await this.client.do
				.get(`${this.basePath}/atms/coordinates`, {latitude, longitude})
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Locations
