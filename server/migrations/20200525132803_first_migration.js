exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email").unique();
      table.string("username").unique();
      table.string("firstname");
      table.string("lastname");
      table.string("password");
      table.string("resetpasswordtoken");
      table.timestamp("create_at").defaultTo(knex.fn.now()); // fn is way we accsses to function in the knex library.knex exports fn
    })
    .createTable("addresses", (table) => {
      table.increments("id"),
        table.string("street"),
        table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("addresses").dropTableIfExists("users");
};
