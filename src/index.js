const {
	API,
	Accounts,
	Cards,
	Currencies,
	Customers,
	Locations,
	Payments,
	Transactions,
	TestCustomers
} = require('./products')

class DNBApi {
	constructor(clientId, clientSecret, apiKey, requestHandler = require('./http')) {
		this.clientId = clientId
		this.clientSecret = clientSecret
		this.apiKey = apiKey

		this.requestHandler = requestHandler

		this.api = new API(this)
		this.accounts = new Accounts(this)
		this.cards = new Cards(this)
		this.currencies = new Currencies(this)
		this.customers = new Customers(this)
		this.locations = new Locations(this)
		this.payments = new Payments(this)
		this.transactions = new Transactions(this)
		this.testCustomers = new TestCustomers(this)
	}
}

module.exports = DNBApi
