const knex = require("../database/knex");

class MoviesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;

    try {
      await knex("movies").insert({
        title,
        description,
        rating,
        user_id
      })
  
      return response.status(200).json();

    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async show(request, response) {
    const { user_id } = request.params;

    try {
      const movies = await knex("movies").where({ user_id });

      return response.json({ ...movies });

    } catch (error) {
      return response.status(400).json({ error: error.message });
      
    }  
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({ id }).delete();

    return response.json();
  }
}

module.exports = MoviesController;