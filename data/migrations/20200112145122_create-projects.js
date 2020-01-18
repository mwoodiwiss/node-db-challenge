exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments("");
      tbl
        .text("project_name", 128)
        .unique()
        .notNullable();
      tbl.text("description", 128);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })

    .createTable("resources", tbl => {
      tbl.increments("id");
      tbl
        .text("resource_name", 128)
        .unique()
        .notNullable();
      tbl.text("description", 128);
    })

    .createTable("project_resources", tbl => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources");
      tbl.primary(["project_id", "resource_id"]);
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      tbl.text("description", 128).notNullable();
      tbl.text("notes", 128);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
