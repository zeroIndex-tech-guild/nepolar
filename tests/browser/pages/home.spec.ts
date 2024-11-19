import { test } from '@japa/runner'

test.group('Pages home', () => {
  test('example test', async ({ visit }) => {
    const page = await visit('/')
    await page.assertTextContains('body', 'Q&A Forum')
  })
})
