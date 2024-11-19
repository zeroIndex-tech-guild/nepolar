import { test } from '@japa/runner'
import { RegistrationData } from '#types/auth'
import { SIGNUP } from '#endpoints/auth'

export const john: RegistrationData = {
  fullName: 'John Doe',
  email: 'john@nepolar.com',
  userName: 'john',
  password: '12345678',
  confirmPassword: '12345678',
}

test.group('Resigter new user', () => {
  const url = 'api' + SIGNUP

  test('Register new user withou any data', async ({ client }) => {
    const response = await client.post(url).json({})
    response.assertStatus(422)
  })

  test('Register a new use with valid data', async ({ assert, client }) => {
    const response = await client.post(url).json(john)

    assert.equal(response.status(), 201)
  })
})
