import { test } from '@japa/runner'
import { LOGIN } from '#endpoints'
import { john } from './data.js'

test.group('Login new user', () => {
  test('Login invalid user', async ({ client }) => {
    const response = await client
      .post(LOGIN)
      .json({ email: 'fake@email.com', password: '12345678' })
    response.assertStatus(401)
  })

  test('Login valid  user', async ({ client }) => {
    const response = await client.post(LOGIN).json({ email: john.email, password: john.password })
    response.assertStatus(200)
  })
})
