import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Challenge from './challenge.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare day: number

  @column()
  declare content: string

  @belongsTo(() => Challenge)
  declare challenge: BelongsTo<typeof Challenge>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
