import Knex from 'knex';

export async function up (knex: Knex){
  return knex.schema.createTable('users', table => {
    table.timestamps(true, true);
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('login').notNullable().unique();
    table.string('password').notNullable();
    table.string('avatar');
  })
}

export async function down (knex: Knex){
  return knex.schema.dropTable('users');
}