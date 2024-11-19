import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { john } from '#tests/functional/auth/data'

// @ts-ignore
delete john.confirmPassword

const data = [
  john,
  {
    fullName: 'Haru Yoshida',
    userName: 'haru',
    email: 'haru@nepolar.com',
    password: 'rootroot',
  },
  {
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
