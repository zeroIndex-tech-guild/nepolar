import User from '#models/user'
import { test } from '@japa/runner'
import { john } from '../auth/data.js'
import { CHALLENGES } from '#endpoints'

test.group('Get all challenges of current user', async () => {
  test('Get all challenges', async ({ client }) => {
    const user = await User.findByOrFail({
      email: john.email,
    })

    const response = await client.get(CHALLENGES).loginAs(user)
    response.assertStatus(200)
  })
})
