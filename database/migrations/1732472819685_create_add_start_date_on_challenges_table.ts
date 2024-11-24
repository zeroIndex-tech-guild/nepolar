import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'challenges'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('start_date')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('start_date')
    })
  }
}
