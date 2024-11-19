import { test } from '@japa/runner'
import { CHALLENGES } from '#endpoints'
import { CreateChallenge } from '#types/challenge'
import User from '#models/user'
import { john } from '../auth/data.js'

const challenge: CreateChallenge = {
  name: 'challenge',
  description: 'challenge description',
  days: 30,
  tags: ['tag1', 'tag2'],
}

test.group('Challenges create', async () => {
  test('Create challge with valid data', async ({ client }) => {
    const user = await User.findByOrFail({
      email: john.email,
    })

    const response = await client.post(CHALLENGES).json(challenge).loginAs(user)
    response.assertStatus(201)
  })
})
