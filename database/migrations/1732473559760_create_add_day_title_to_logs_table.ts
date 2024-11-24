import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('day').notNullable().defaultTo(0)
      table.string('title').notNullable().defaultTo('Untitled...')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('day')
      table.dropColumn('title')
    })
  }
}
