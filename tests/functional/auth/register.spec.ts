import { test } from '@japa/runner'
import { SIGNUP } from '#endpoints/auth'
import { john } from './data.js'

test.group('Resigter new user', () => {
  const url = 'api' + SIGNUP
  //
  //test('Register new user withou any data', async ({ client }) => {
  //  const response = await client.post(url).json({})
  //  response.assertStatus(422)
  //})
  //
  //test('Register a new use with valid data', async ({ assert, client }) => {
  //  const response = await client.post(url).json(john)
  //
  //  assert.equal(response.status(), 201)
  //})
})
