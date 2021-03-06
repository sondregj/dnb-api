const test = require('ava')

const DNBApi = require('../../src')

test.before(async t => {
	if (process.env.NODE_ENV !== 'CI') {
		require('dotenv').config()
	}

	t.context.client = new DNBApi(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.API_KEY)
	t.context.testCustomerSSN = await t.context.client.testCustomer.getTestCustomer().customers[0].ssn
	t.context.token = await t.context.client.api.getToken('SSN', t.testCustomerSSN)
})


test.todo('Get DNB branches')
test.todo('Get branch details')
test.todo('Get DNB ATMs')
test.todo('Find nearest branch by address')
test.todo('Find nearest branch by coordinates')
test.todo('Find nearest DNB ATM by coordinates')

