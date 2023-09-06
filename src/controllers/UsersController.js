const knex = require("../database/knex");
const bcrypt = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    try {
      const checkUserExists = await knex("users").where("email", email).first();

      if(checkUserExists) {
        throw new Error("Este e-mail já está em uso.");
      }

      const hanshedPassword = await bcrypt.hash(password, 8);

      await knex("users").insert({ name, email, password: hanshedPassword });

      return response.status(200).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsersController;