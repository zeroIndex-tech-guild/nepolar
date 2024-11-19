import User from '#models/user'
import { test } from '@japa/runner'
import { john } from '../auth/data.js'
import { CHALLENGES } from '#endpoints'
import Challenge from '#models/challenge'

test.group('Update challenge', async () => {
  test('update challenge', async ({ client }) => {
    const user = await User.findByOrFail({
      email: john.email,
    })

    const challenge = await Challenge.findByOrFail({
      user_id: user.id,
    })

    const response = await client
      .put(CHALLENGES + '/' + challenge.id)
      .json({
        name: 'updated challenge',
        ...challenge.toJSON(),
      })
      .loginAs(user)

    console.log({ response })
    response.assertStatus(200)
  })
})
