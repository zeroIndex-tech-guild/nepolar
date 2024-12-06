import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('summary').defaultTo('')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('summary')
    })
  }
}
