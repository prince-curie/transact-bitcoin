'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis');
const Route = use('Route')
const schema = require('../app/schema/calculatePriceSchema')

Route.route('/graphql',
  graphqlAdonis({
    schema,
  }),
  ['GET', 'POST'],
)

Route.route(
  '/graphiql',
  graphiqlAdonis({
    endpointURL: '/graphql',
  }),
  ['GET', 'POST'],
)
