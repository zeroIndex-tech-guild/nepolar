import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

const data = [
  {
    id: 1,
    fullName: 'Haru Yoshida',
    userName: 'haru',
    email: 'haru@nepolar.com',
    password: 'rootroot',
  },
  {
    id: 2,
    fullName: 'Sora Kato',
    userName: 'sora',
    email: 'sora@nepolar.com',
    password: 'rootroot',
  },
]

export default class extends BaseSeeder {
  async run() {
    await User.createMany(data)
  }
}
