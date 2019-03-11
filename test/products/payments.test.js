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

test.todo('Initiate payment')
test.todo('Delete payment')
test.todo('Update existing payment')
test.todo('Get due payments by account')
test.todo('Get due payment by id')
test.todo('Find nearest DNB ATM by coordinates')
