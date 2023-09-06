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

}

module.exports = MoviesController;