const Aika = require('aika')
const headerBuilder = require('./aika/headerbuilder')

const LIVE_HOST = 'developer-api.dnb.no'
const TEST_HOST = 'developer-api-testmode.dnb.no'

// Import API product handlers
const {	API, Cards, Currencies, Customers, Locations, TestCustomers } = require('./products')

/**
 * DNBApi
 * @param clientId of the application
 * @param clientSecret of the application
 * @param apiKey of the application
 * @returns API client
 */

class DNBApi {
	constructor(options) {
		if (!options) {
			throw new Error('Please specify options.')
		}

		const { 
			clientId, 
			clientSecret, 
			apiKey, 
			liveMode, 
			service, 
			region, 
			endpoint 
		} = options

		if (!(clientId, clientSecret, apiKey)) {
			throw new Error('You need to specify clientId, clientSecret and apiKey.')
		}

		this.clientId = clientId
		this.clientSecret = clientSecret
		this.apiKey = apiKey

		this.service = service || 'execute-api'
		this.region = region || 'eu-west-1'
		this.host = endpoint || liveMode 
			? LIVE_HOST
			: TEST_HOST

		this.dnbToken = {
			jwt: ''
		}

		// Initialize HTTP client
		this.do = new Aika({
			host: this.host
		})

		// Add Aws signing middleware
		this.do.use(headerBuilder({
			clientId,
			clientSecret,
			apiKey,
			token: this.dnbToken,
			hostName: this.host,
			awsRegion: this.region,
			awsService: this.service
		}))

		this.api = new API(this)
		this.cards = new Cards(this)
		this.currencies = new Currencies(this)
		this.customers = new Customers(this)
		this.locations = new Locations(this)
		this.testCustomers = new TestCustomers(this)
	}

	token(jwt) {
		this.dnbToken.jwt = jwt

		return this
	}
}

module.exports = DNBApi
