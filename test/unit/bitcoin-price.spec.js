'use strict'

const { test, trait } = use('Test/Suite')('Bitcoin Price')


trait('Test/ApiClient')

test('Get the price to buy a bitcoin', async ({ client }) => {
  const response = await client
    .get('/graphql')
    .query({
      query: `{transactBitcoin(type: "buy", margin: 0.02, 
      exchangeRate: 300) {status message } }` })
    .end()

  response.assertJSONSubset({
    "data": {
      "transactBitcoin": {
        "status": "Success",
      }
    }
  })
}).timeout(0)

test('Get the price to sell a bitcoin', async ({ client }) => {
  const response = await client
    .get('/graphql')
    .query({
      query: `{transactBitcoin(type: "sell", margin: 0.02, 
      exchangeRate: 300) {status message } }` })
    .end()

  response.assertJSONSubset({
    "data": {
      "transactBitcoin": {
        "status": "Success",
      }
    }
  })
}).timeout(0)

test('Get an error message since buy or sell is not the chosen type', async ({ client }) => {
  const response = await client
    .get('/graphql')
    .query({
      query: `{transactBitcoin(type: "seller", margin: 0.02, 
      exchangeRate: 300) {status message } }` })
    .end()

  response.assertJSONSubset({
    "data": {
      "transactBitcoin": {
        "status": "Fail",
        "message": "type should be either buy or sell"
      }
    }
  })
}).timeout(0)