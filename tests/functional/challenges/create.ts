import { test } from '@japa/runner'

test.group('Create Challange', () => {
  test('Create Challenge', async ({ client }) => {
    const response = await client.post('/challenges')
    response.assertStatus(200)
  })
})
