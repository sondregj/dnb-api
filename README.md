<h1 align="center">
  <a href='https://developer.dnb.no' ><img src='https://svgshare.com/i/BkG.svg' width="250" title='DNB Developer' /></a>
  <br>
  <br>
  DNB Open Banking Client
</h1>

<h4 align="center">A Node.js client for DNB's various API products. (Under development, may change)</h4>


<p align="center">
  <a href="https://travis-ci.org/sondregj/dnb-api">
    <img alt="Travis Build Status" src="https://img.shields.io/travis/sondregj/dnb-api.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/dnb-api">
  	<img alt="npm (latest)" src="https://img.shields.io/npm/v/dnb-api/latest.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/dnb-api">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/dnb-api.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/dnb-api">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/sondregj/dnb-api.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/dnb-api">
    <img alt="License" src="https://img.shields.io/github/license/sondregj/dnb-api.svg?style=flat-square">
  </a>
  
  <a href="https://github.com/carloscuesta/gitmoji">
  <img alt="Gitmoji" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square">
  </a>
</p>

The APIs are currently under development, and only available in a sandbox. To use this API, you have to create an application at [https://developer.dnb.no](https://developer.dnb.no).

See examples below.

## Usage

All the functions are asynchronous and return promises.

```javascript
const DNBApi = require('dnb-api-client')

const client = new DNBApi('CLIENT_ID', 'CLIENT_SECRET', 'API_KEY')

const fetchCustomerData = async () => {
  const jwt = await client.getToken('SSN', '12345678910')

  return await client.token(jwt).customers.getCustomerInfo()
}

fetchCustomerData()
  .then( customer => console.log(`${customer.firstName} ${customer.lastName}`) )
  .catch( err => console.log(err.message) )
```

For more examples see below.

## Features

Each API product is subdivided from the main object.

```javascript
client.accounts      // Accounts API
client.api           // General
client.cards         // Cards API
client.currencies    // Currencies API
client.customers     // Customers API
client.locations     // Locations API
client.payments      // Payments API
client.testCustomers // Test Customers API
client.transactions  // Transactions API
```

## Examples

## Development

First, clone the repo. You will need API keys to run the tests. Make a new app at [https://developer.dnb.no](https://developer.dnb.no), duplicate `sample.env` and paste in the keys.

Do `npm install`.

Run tests with `npm test`.

Run linter with `npm run lint`

Do not commit directly to master. Preferably, make a branch or fork out of the `development` branch and make a pull request.

## License

MIT © 2019 Sondre Gjellestad
