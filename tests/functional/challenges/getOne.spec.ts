import User from '#models/user'
import { test } from '@japa/runner'
import { john } from '../auth/data.js'
import { CHALLENGES } from '#endpoints'
import Challenge from '#models/challenge'

test.group('Get challenge by id', async () => {
  test('Get single challenge by id', async ({ client }) => {
    const user = await User.findByOrFail({
      email: john.email,
    })

    const challenge = await Challenge.findByOrFail({
      user_id: user.id,
    })

    const response = await client.get(CHALLENGES + '/' + challenge.id).loginAs(user)
    response.assertStatus(200)
  })
})
