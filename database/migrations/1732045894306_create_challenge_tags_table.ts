import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'challenge_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').nullable()

      table
        .integer('challenge_id')
        .unsigned()
        .references('challenges.id')
        .onDelete('CASCADE')
        .notNullable()

      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE').notNullable()

      table.unique(['challenge_id', 'tag_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
