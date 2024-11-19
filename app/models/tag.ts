import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Challenge from './challenge.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Challenge, {
    pivotTimestamps: true,
  })
  declare challenges: ManyToMany<typeof Challenge>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
