const { Router } = require("express");

const usersRoutes = require("./users.routes");

const routes = Router();

// Users
routes.use('/users', usersRoutes);

module.exports = routes;