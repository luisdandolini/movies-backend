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
  
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;
    
    try {
      const user = await knex("users").where("id", id).first();

      if(!user) {
        throw new Error("Usuário não encontrado!");
      }

      const userWithUpdatedEmail = await knex("users").where("email", email).whereNot("id", user.id).first();

      if(userWithUpdatedEmail) {
        throw new Error("Este e-mail já está em uso.")
      }

      if (password && old_password) {
        const checkOldPassword = await bcrypt.compare(old_password, user.password);
      
        if (!checkOldPassword) {
          throw new Error("A senha antiga não confere.");
        }
      
        const hashedPassword = await bcrypt.hash(password, 8);
        await knex("users").where("id", id).update({
          name,
          email,
          password: hashedPassword,
          updated_at: knex.raw('DATETIME("now")')
        });
      } else {
        await knex("users").where("id", id).update({
          name,
          email,
          updated_at: knex.raw('DATETIME("now")')
        });
      }

      return response.status(200).json();

    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsersController;