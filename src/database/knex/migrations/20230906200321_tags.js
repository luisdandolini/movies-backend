exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name");
  
  table.integer("note_id").references("id").inTable("movies");
  table.integer("user_id").references("id").inTable("movies");
});

exports.down = knex => knex.schema.dropTable("tags");
