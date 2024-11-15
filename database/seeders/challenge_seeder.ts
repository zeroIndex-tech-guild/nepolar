import Challenge from '#models/challenge'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const datas = [
  {
    challenges: [
      {
        id: 1,
        name: 'first challenge',
        userId: 1,
        days: 30,
        tags: [{ name: 'web' }, { name: 'dev' }],
        logs: [{ day: 1, content: 'first log', challenge: 1 }],
      },
    ],
  },
]

export default class extends BaseSeeder {
  async run() {
    for (let data of datas) {
      const { challenges } = data

      for (let challenge of challenges) {
        const { userId, days, name, tags, logs } = challenge

        const user = await User.find(userId)

        const createdChallenge = await Challenge.create({
          days,
          name,
        })

        //createdChallenge.related('user').associate(user!)
        //
        //createdChallenge.related('logs').createMany(logs)
        //
        //createdChallenge.related('tags').createMany(tags)
      }
    }
  }
}
