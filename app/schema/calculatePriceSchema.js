'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers/calculatePriceResolver')

const typeDefs = `
  type BitcoinPrice {
    status: String
    message: String
  }

  type Query {
    transactBitcoin(
      type: String!, 
      margin: Float!, 
      exchangeRate: Int!
    ): BitcoinPrice
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })