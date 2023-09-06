const knex = require("../database/knex");

class TagsController {
  async create(request, response) {
    const { name } = request.body;  
    
    await knex("tags").insert({
      name
    });

    return response.json();
  }

  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("tags")
      .where({ user_id })
    
    return response.json(tags); 
  }
}

module.exports = TagsController;